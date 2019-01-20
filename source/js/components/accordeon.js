module.exports = class {
    constructor(selector, settings, cb) {
        this.accordeon = document.querySelector(selector);
        this.list = this.accordeon.querySelector('ul');
        this.items = this.list.children;
        this.settings = settings;
        this.cb = cb;

        if (settings.autoHeight) {
            this.autoHeight = (item, scope) => {
                const content = item.querySelector(`${selector}__content`);
                const height = scope ? 0 : content.clientHeight;
                const container = content.parentNode;

                container.style.setProperty('--auto-height', `${height}px`);
            }
        }

        if (settings.active) {
            const item = this.items[settings.active - 1];

            item.classList.add('active');

            if (this.autoHeight) {
                this.autoHeight(item);
            }

            if (this.cb) this.cb(item);
        }

        this.accordeon.addEventListener('click', this.handlerClick.bind(this));
    }

    handlerClick(e) {
        const target = e.target.closest('a');

        if (!target) return;

        const currentItem = target.parentNode;
        const isActive = currentItem.classList.contains('active');
        const container = target.nextElementSibling

        container.style.setProperty(
            '--transition-acco',
            `${this.settings.duration || 0}ms ${this.settings.animate || 'ease-in'}`
        );

        if (!isActive) {
            for (const item of this.items) {
                item.classList.remove('active');

                if (this.autoHeight) {
                    this.autoHeight(item, true);
                }
            }

            currentItem.classList.add('active');

            if (this.autoHeight) {
                this.autoHeight(currentItem);
            }

            if (this.cb) this.cb(currentItem);

        } else {
            currentItem.classList.remove('active');

            if (this.autoHeight) {
                this.autoHeight(currentItem, true);
            }
        }
    }
}