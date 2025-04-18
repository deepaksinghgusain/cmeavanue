import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  slides = [
    { img: "https://placehold.co/600x400" },
    { img: "https://placehold.co/600x40" },
    { img: "https://placehold.co/600x401" },
    { img: "https://placehold.co/600x402" },
    { img: "https://placehold.co/600x405" },
  ];

  constructor() {
  }

  slideConfig = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4 ,
    slidesToScroll: 4,
    arrows:true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
}
