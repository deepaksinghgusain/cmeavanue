import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SubSink } from 'subsink';
import { CommonService } from '../../services/common.service';

@Component({
  standalone: true,
  selector: 'app-testimonial',
  imports: [SlickCarouselModule, CommonModule],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent implements OnInit {

  testimonials: any;
  public unsubscribe$ = new SubSink()

  constructor(private _commonService: CommonService){}


  ngOnInit(): void {
    this.gethomePageSection();
  }

  gethomePageSection() {
    this.unsubscribe$.add(this._commonService.getHomePageSection().subscribe((res: any) => {

      if (res) {
        this.testimonials = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.testimonial')[0];
      }
    }));
  }

  slideConfig = {
    slidesToShow: 1,
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
