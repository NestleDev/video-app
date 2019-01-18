module.exports = class {
    constructor() { }

    $(selector, parent = document) {
        return parent.querySelector(selector);
    }

    showPopup(selector, data) {
        const popup = this.$(selector);
        const overlay = popup.parentNode;

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                this.$(`.popup__${key}`, popup).textContent = data[key];
            }
        }

        overlay.classList.add('overlay_active')
        popup.classList.add(`popup_show`);

        this.$(`.popup__close`, popup).addEventListener('click', () => {
            overlay.classList.remove('overlay_active');
            popup.classList.remove(`popup_show`);
        }, { once: true })
    }
}