import { CommonModule } from '@angular/common';
import { Component,  OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { SubSink } from 'subsink';
import { CommonService } from '../../services/common.service';
import { TestimonialService } from '../../services/testimonial.service';
import { FullstarComponent } from '../../services/fullstar/fullstar.component';
import { HalfstarComponent } from '../../services/halfstar/halfstar.component';
import { BlankstarComponent } from '../../services/blankstar/blankstar.component';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-testimonial',
  imports: [SlickCarouselModule, CommonModule, FullstarComponent, HalfstarComponent, BlankstarComponent],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  testimonials: any = [];
  public unsubscribe$ = new SubSink()
  imageUrl = environment.imageEndPoint;

  constructor(private _commonService: CommonService, private testimonial: TestimonialService){}

  ngOnInit(): void {
    this.getTestimonials();
  }

  getTestimonials() {
    this.testimonial.getTestimonial().subscribe((res: any) => {

      if (res) {
        let testimonial = res.data.testimonials.data
        
        for (const element of testimonial) {
          this.testimonials.push(element.attributes);
        }
      }         
    })
  }

  prev() {
    this.slickModal?.slickPrev();
  }

  next() {
    this.slickModal?.slickNext();
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
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
}
