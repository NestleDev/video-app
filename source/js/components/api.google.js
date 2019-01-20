require("babel-polyfill");

module.exports = class {
    constructor() {}

    init(el, config) {
        this.map = new google.maps.Map(document.querySelector(el), config);
    }

    createPlacemark(coords, cb) {
        const marker = new google.maps.Marker({
            position: coords,
            icon: '../images/icons/map-marker.svg',
            animation: google.maps.Animation.BOUNCE,
            map: this.map
        });

        marker.addListener('click', async () => {
            if (cb) {
                cb({
                    address: await this.getAddress(coords)
                });
            }
        });
    }

    async getAddress(coords) {
        const response = await this.geocoder(coords);

        return response[0].formatted_address
    }

    geocoder(coords) {
        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();

            geocoder.geocode({ 'location': coords }, (result, status) => {
                if (status === 'OK') {
                    resolve(result);
                } else {
                    reject(new Error('Geocoder failed due to: ' + status))
                }
            })
        });
    }
}