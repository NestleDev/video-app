module.exports = class {
    constructor() { }

    $(selector, parent = document) {
        return document.querySelector(selector);
    }

    showPopup(selector, message) {
        const popup = this.$(selector);
        const overlay = popup.parentNode;
        const msg = this.$(`.popup__message`, popup);
        console.log(msg)
        msg.textContent = message;
        overlay.classList.add('overlay_active')
        popup.classList.add(`popup_show`);

        this.$(`.popup__close`).addEventListener('click', () => {
            overlay.classList.remove('overlay_active');
            popup.classList.remove(`popup_show`);
        }, { once: true })
    }
}