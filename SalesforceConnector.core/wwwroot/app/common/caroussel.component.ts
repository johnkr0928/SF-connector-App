//Import Component form the angular core package
import { Component } from '@angular/core';

//Importt the Image interface
import { Image } from './image.interface';

//Compoent Decorator
@Component({
    //Name of our tag
    selector: 'css-carousel',
    //Template for the tag
    template: `
 <div class="carousel">

  <ul class="slides">

    <li *ngFor="let image of images">
      <h2>{{image.title}}</h2>
      <img src="{{image.url}}" alt="">
    </li>
   
  </ul>

</div>
  `,
    //Styles for the tag
    styles: [`
.carousel{
    overflow:hidden;
    width:100%;

}
.slides{
    list-style:none;
    position:relative;
    width:500%; /* Number of panes * 100% */
    overflow:hidden; /* Clear floats */
        /* Slide effect Animations*/
    -moz-animation:carousel 30s infinite;
    -webkit-animation:carousel 30s infinite;
    animation:carousel 30s infinite;
}
.slides > li{
    position:relative;
    float:left;
    width: 20%; /* 100 / number of panes */
}
.carousel img{
    display:block;
    width:100%;
    max-width:100%; height:600px;
}
.carousel h2{
    margin-bottom: 0;
    font-size:1em;
    padding:1.5em 0.5em 1.5em 0.5em;
    position:absolute;
    right:0px;
    bottom:0px;
    left:0px;
    text-align:center;
    color:#fff;
    background-color:rgba(0,0,0,0.75);
    text-transform: uppercase;
}

@keyframes carousel{
    0%    { left:-5.5%; }
    11%   { left:-5.5%; }
    12.5% { left:-105.5%; }
    23.5% { left:-105.5%; }
    25%   { left:-205.5%; }
    36%   { left:-205.5%; }
    37.5% { left:-305.5%; }
    48.5% { left:-305.5%; }
    50%   { left:-405.5%; }
    61%   { left:-405.5%; }
    62.5% { left:-305.5%; }
    73.5% { left:-305.5%; }
    75%   { left:-205.5%; }
    86%   { left:-205.5%; }
    87.5% { left:-105.5%; }
    98.5% { left:-105.5%; }
    100%  { left:-5.5%; }
}
  `],
})
//Carousel Component itself
export class CSSCarouselComponent {
    //images data to be bound to the template
    public images = IMAGES;
}
//IMAGES array implementing Image interface
var IMAGES: Image[] = [
    { "title": "Fishbowl Api Connector", "url": "https://embed-ssl.wistia.com/deliveries/7f32a9178db6e1afd7acd3fbcc024db4de66fad0.jpg?image_crop_resized=1920x1060" },
    { "title": "Fishbowl Flow", "url": "https://embed-ssl.wistia.com/deliveries/7f32a9178db6e1afd7acd3fbcc024db4de66fad0.jpg?image_crop_resized=1920x1060" },
    { "title": "Fishbowl Integration", "url": "https://embed-ssl.wistia.com/deliveries/7f32a9178db6e1afd7acd3fbcc024db4de66fad0.jpg?image_crop_resized=1920x1060" },
    { "title": "Salesforce connector for application", "url": "images/Salesforce.jpg" },
    { "title": "Salesforce", "url": "https://embed-ssl.wistia.com/deliveries/7f32a9178db6e1afd7acd3fbcc024db4de66fad0.jpg?image_crop_resized=1920x1060" }
];