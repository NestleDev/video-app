module.exports = class {
    constructor(settings) {
        if (settings && settings.form.selector) {
            this.form = document.querySelector(settings.form.selector);
            this.method = this.form.getAttribute('method');
            this.action = this.form.getAttribute('action');
            this.settings = settings.form;
            this.required = this.form.querySelectorAll('[data-valid]');

            for (const field of this.required) {
                field.previousElementSibling.classList.add('required');
            }

            this.form.addEventListener('submit', this.handlerSubmit.bind(this));
        }
    }

    handlerSubmit(e) {
        e.preventDefault();

        const form = e.currentTarget;

        if (!this.settings.valid) return this.send(e.target);

        if (this.isValidation(form)) {
            this.send({
                url: this.action,
                method: this.method,
                data: new FormData(form),
                success: this.settings.success,
                error: this.settings.error
            });
        }
    }

    isValidation(form) {
        const requredFields = form.querySelectorAll('[data-valid]');
        const errors = [];

        for (const field of requredFields) {
            if (field.value.replace(/\+7|_|-|\(|\)/g, "").length < field.dataset.valid) {
                errors.push(field);
            }
        }

        return this.isErrorFields(errors)
    }

    async send(settings) {
        const response = await fetch(settings.url,
            {
                method: settings.method || 'GET',
                body: settings.data ? settings.data : null
            }
        );

        if (response.status === 200) {
            const data = await response.json();

            settings.success(data, this.form);
        } else {
            settings.error(response)
        }
    }

    isErrorFields(fields) {
        if (fields.length) {
            fields.forEach(field => {
                this.showErrorField(field)
            });

            return false;
        }

        return true;
    }

    showErrorField(field) {
        field.classList.add('field__input_error');
        field.placeholder = 'Заполните это поле';

        field.addEventListener('focus', this.hideErrorField, { once: true });
    }

    hideErrorField(e) {
        console.log(e.target)
        e.target.classList.remove('field__input_error');
    }
}
