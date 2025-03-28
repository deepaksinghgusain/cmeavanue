import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  standalone: true,
  selector: 'app-testimonial',
  imports: [SlickCarouselModule, CommonModule],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent {
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };
  slides = [
    { img: 'https://via.placeholder.com/600x300?text=Slide+1' },
    { img: 'https://via.placeholder.com/600x300?text=Slide+2' },
    { img: 'https://via.placeholder.com/600x300?text=Slide+3' },
    { img: 'https://via.placeholder.com/600x300?text=Slide+4' },
    { img: 'https://via.placeholder.com/600x300?text=Slide+5' }
  ];
}
