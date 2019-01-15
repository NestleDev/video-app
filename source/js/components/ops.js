module.exports = class {
    constructor(selector, settings) {
        this.container = document.querySelector(selector);
        this.sections = this.container.children;
        this.settings = settings;
        this.posIndex = 0;
        this.isAnimate = false;

        window.addEventListener('wheel', this.handlers.bind(this));

        for (const event in settings.events) {
            if (settings.events.hasOwnProperty(event)) {

                if (settings.events[event]) {
                    window.addEventListener(event, this.handlers.bind(this));
                }
            }
        }

        settings.controls.forEach(selector => {
            const nav = document.querySelector(selector);

            nav.innerHTML = require(`../../view/components/template-pagination.hbs`)({
                root: selector.substring(1),
                sections: this.sections
            });

            this.reactive(0);

            nav.addEventListener('click', this.handlers.bind(this));
        });
    }

    handlers(e) {
        if (this.isAnimate) return;

        switch (e.type) {
            case 'wheel':
                if (e.deltaY > 0) {
                    this.updatePos('down');
                } else {
                    this.updatePos('up');
                }
                break;
            case 'keyup':
                if (e.keyCode === 40) {
                    this.updatePos('down');
                } else if (e.keyCode === 38) {
                    this.updatePos('up');
                }
                break;
            case 'click':
                if (e.target.tagName === 'A') {
                    const index = e.target.getAttribute('href').substring(1);

                    this.reactive(index);
                    this.updatePos(index);
                }
                break;
        }
    }

    reactive(index) {
        this.settings.controls.forEach((selector) => {
            const nav = document.querySelector(selector);
            const list = nav.firstElementChild;
            const items = list.children;

            for (const item of items) {
                item.classList.remove('active');
            }

            items[parseInt(index)].classList.add('active');
        });
    }

    updatePos(vector) {
        switch (vector) {
            case 'down':
                if (this.sections[this.posIndex + 1]) {
                    this.slideTo(++this.posIndex);
                }
                break;
            case 'up':
                if (this.sections[this.posIndex - 1]) {
                    this.slideTo(--this.posIndex);
                }
                break;
            default:
                this.posIndex = parseInt(vector);
                this.slideTo(this.posIndex);

        }
    }

    slideTo(index) {
        if (this.sections[index]) {
            this.isAnimate = true;
            this.posIndex = index;

            this.container.style.setProperty("--transformY", `${-index * 100}%`);
            this.container.style.setProperty("--transition-slide", `${this.settings.duration || 1}ms ${this.settings.animate}`);

            this.reactive(index);

            setTimeout(() => {
                this.isAnimate = false;
            }, this.settings.duration);
        } else {
            throw new Error(`the section at this index is not found`);
        }
    }
}