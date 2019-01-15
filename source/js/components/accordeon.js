module.exports = class {
    constructor(selector, settings) {
        this.accordeon = document.querySelector(selector);
        this.list = this.accordeon.querySelector('ul');
        this.items = this.list.children;
        this.settings = settings;

        if (settings.autoHeight) {
            this.autoHeight = (item, scope) => {
                const content = item.querySelector(`${selector}__content`);
                const height = scope ? 0 : content.clientHeight;
                const container = content.parentNode;

                container.style.setProperty('--auto-height', `${height}px`);
            }
        }

        if (settings.active) {
            this.items[settings.active - 1].classList.add('active');
            
            if (this.autoHeight) {
                this.autoHeight(this.items[settings.active - 1]);
            }
        }

        this.accordeon.addEventListener('click', this.handlerClick.bind(this));
    }

    handlerClick(e) {
        const target = e.target.closest('a');
        const currentItem = target.parentNode;
        const isActive = currentItem.classList.contains('active');
        const container = target.nextElementSibling

        container.style.setProperty(
            '--transition-acco',
            `${this.settings.duration || 0}ms ${this.settings.animate || 'ease-in'}`
        );

        if (target && !isActive) {
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
        } else {
            currentItem.classList.remove('active');

            if (this.autoHeight) {
                this.autoHeight(currentItem, true);
            }
        }
    }
}