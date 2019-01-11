const GoogleMap = require('./components/api.google');
const config = require('./config.json');
const DOM = require('./components/dom');


const DOM_API = new DOM();
const myApiGoogle = new GoogleMap();

myApiGoogle.init('#map', {
    center: { lat: 59.944098, lng: 30.307179 },
    zoom: 14,
    disableDefaultUI: true,
    styles: config.googleMap.style
});

config.googleMap.markers.forEach(coords => {
    myApiGoogle.createPlacemark(coords, (data) => {
        DOM_API.showPopup('#pupup-status', data.address);
    });
});