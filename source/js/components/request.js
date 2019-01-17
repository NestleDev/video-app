module.exports = class {
    constructor(settings) {
        if (settings.form.selector) {
            this.form = document.querySelector(settings.form.selector);
            this.method = this.form.getAttribute('method');
            this.action = this.form.getAttribute('action');
            this.valid = settings.form.valid;

            this.form.addEventListener('submit', this.handlerSubmit.bind(this));
        }
    }

    handlerSubmit(e) {
        e.preventDefault();

        const form = e.currentTarget;

        if (!this.valid) return this.sendRequest(e.target);

        if (this.isValidation(form)) {
            this.sendRequest({
                url: this.action,
                method: this.method,
                data: new FormData(form)
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

    sendRequest(settings) {
        console.log(settings);
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
        field.placeholder = `Заполните это поле`;
    }
}
