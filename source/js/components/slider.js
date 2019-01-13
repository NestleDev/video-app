module.exports = class {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        this.list = this.slider.querySelector('ul');
        this.items = this.list.children;
        this.firstItem = this.items[0];
        this.indexPos = 0;

        this.firstItem.style.left = 0;
        this.firstItem.style.zIndex = 1;
        this.firstItem.style.opacity = 1;


        this.slider.addEventListener('click', (e) => {
            const arrow = e.target.closest('a');

            if (arrow) {
                const vector = arrow.getAttribute('href').substring(1);
                this.slideTo(vector);
            }
        });
    }

    slideTo(vector) {
        if (this.isAnimate) return;

        const active = this.items[this.indexPos];

        if (vector === 'next' && active.nextElementSibling) {

            this.indexPos++;
            active.style.zIndex = 0;

            this.items[this.indexPos].style.left = 0;
            this.items[this.indexPos].style.zIndex = 1;
            this.items[this.indexPos].style.opacity = 1;

            setTimeout(() => {
                active.style.left = '100%';
                active.style.opacity = 0;
            }, 500);
        } else if (vector === 'prev' && active.previousElementSibling) {
            this.indexPos--;
            active.style.zIndex = 0;

            this.items[this.indexPos].style.left = 0;
            this.items[this.indexPos].style.zIndex = 1;
            this.items[this.indexPos].style.opacity = 1;

            setTimeout(() => {
                active.style.left = '-100%';
                active.style.opacity = 0;
            }, 500);
        }
    }
}