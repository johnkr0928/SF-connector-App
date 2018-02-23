"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//Import Component form the angular core package
var core_1 = require('@angular/core');
//Compoent Decorator
var CSSCarouselComponent = (function () {
    function CSSCarouselComponent() {
        //images data to be bound to the template
        this.images = IMAGES;
    }
    CSSCarouselComponent = __decorate([
        core_1.Component({
            //Name of our tag
            selector: 'css-carousel',
            //Template for the tag
            template: "\n <div class=\"carousel\">\n\n  <ul class=\"slides\">\n\n    <li *ngFor=\"let image of images\">\n      <h2>{{image.title}}</h2>\n      <img src=\"{{image.url}}\" alt=\"\">\n    </li>\n   \n  </ul>\n\n</div>\n  ",
            //Styles for the tag
            styles: ["\n.carousel{\n    overflow:hidden;\n    width:100%;\n\n}\n.slides{\n    list-style:none;\n    position:relative;\n    width:500%; /* Number of panes * 100% */\n    overflow:hidden; /* Clear floats */\n        /* Slide effect Animations*/\n    -moz-animation:carousel 30s infinite;\n    -webkit-animation:carousel 30s infinite;\n    animation:carousel 30s infinite;\n}\n.slides > li{\n    position:relative;\n    float:left;\n    width: 20%; /* 100 / number of panes */\n}\n.carousel img{\n    display:block;\n    width:100%;\n    max-width:100%; height:600px;\n}\n.carousel h2{\n    margin-bottom: 0;\n    font-size:1em;\n    padding:1.5em 0.5em 1.5em 0.5em;\n    position:absolute;\n    right:0px;\n    bottom:0px;\n    left:0px;\n    text-align:center;\n    color:#fff;\n    background-color:rgba(0,0,0,0.75);\n    text-transform: uppercase;\n}\n\n@keyframes carousel{\n    0%    { left:-5.5%; }\n    11%   { left:-5.5%; }\n    12.5% { left:-105.5%; }\n    23.5% { left:-105.5%; }\n    25%   { left:-205.5%; }\n    36%   { left:-205.5%; }\n    37.5% { left:-305.5%; }\n    48.5% { left:-305.5%; }\n    50%   { left:-405.5%; }\n    61%   { left:-405.5%; }\n    62.5% { left:-305.5%; }\n    73.5% { left:-305.5%; }\n    75%   { left:-205.5%; }\n    86%   { left:-205.5%; }\n    87.5% { left:-105.5%; }\n    98.5% { left:-105.5%; }\n    100%  { left:-5.5%; }\n}\n  "],
        })
    ], CSSCarouselComponent);
    return CSSCarouselComponent;
}());
exports.CSSCarouselComponent = CSSCarouselComponent;
//IMAGES array implementing Image interface
var IMAGES = [
    { "title": "Fishbowl Api Connector", "url": "https://embed-ssl.wistia.com/deliveries/7f32a9178db6e1afd7acd3fbcc024db4de66fad0.jpg?image_crop_resized=1920x1060" },
    { "title": "Fishbowl Flow", "url": "https://embed-ssl.wistia.com/deliveries/7f32a9178db6e1afd7acd3fbcc024db4de66fad0.jpg?image_crop_resized=1920x1060" },
    { "title": "Fishbowl Integration", "url": "https://embed-ssl.wistia.com/deliveries/7f32a9178db6e1afd7acd3fbcc024db4de66fad0.jpg?image_crop_resized=1920x1060" },
    { "title": "Salesforce connector for application", "url": "images/Salesforce.jpg" },
    { "title": "Salesforce", "url": "https://embed-ssl.wistia.com/deliveries/7f32a9178db6e1afd7acd3fbcc024db4de66fad0.jpg?image_crop_resized=1920x1060" }
];
