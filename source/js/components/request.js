module.exports = class {
    constructor(settings) {
        if (settings.form.selector) {
            this.form = document.querySelector(settings.form.selector);
            this.method = this.form.getAttribute('method');
            this.action = this.form.getAttribute('action');
            this.valid = settings.form.valid;
            this.validFields = {}
        }

        this.form.addEventListener('submit', this.handlerSubmit.bind(this));
    }

    handlerSubmit(e) {
        e.preventDefault();

        if (this.valid) {
            this.validation(e.currentTarget);
        }
    }

    validation(form) {
        const requredFields = form.querySelectorAll('[data-valid]');

        for (const field of requredFields) {
            if (field.value.length < field.dataset.valid) {
                this.validFields[field.name] = false;
                this.showErrorField(field);
            } else {
                this.validFields[field.name] = true;
            }
        }
    }

    showErrorField(field) {
        field.placeholder = `Заполните это поле`;
    }
}
