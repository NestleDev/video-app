const GoogleMap = require('./components/api.google');
const config = require('./config.json');
const DOM = require('./components/dom');
const OPS = require('./components/ops');
const DOM_API = new DOM();


//OPS
const ops = new OPS('.maincontent', {
    events: {
        keyup: true
    },
    controls: ['.pagination'],
    duration: 1000,
    animate: 'cubic-bezier(0.075, 0.82, 0.165, 1)'
});
/////////////

//map
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
////////////

//Jquery scripts
$(document).ready(function () {
    //Slider
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        autoplay: true,
        dotsClass: 'slider__dots',
        dotClass: 'slider__dot',
        navContainerClass: 'slider__controls',
        navClass: ['slider__control slider__control_prev', 'slider__control slider__control_next'],
        navText: [
            "<svg class=\"slider__control-icon\"><use xlink:href=\"images/icons/sprite.svg#arrow-scroll\" /></svg>",
            "<svg class=\"slider__control-icon\"><use xlink:href=\"images/icons/sprite.svg#arrow-scroll\" /></svg>"
        ]
    });
    ////////////

    //
    $('.nav__link, .button_action_scroll, .arrow-down').on('click', function () {
        const index = this.getAttribute('href').substring(1);
        ops.slideTo(parseInt(index));
    });
});
///////////