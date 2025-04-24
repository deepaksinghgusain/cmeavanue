import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import moment from "moment";
import 'moment-timezone';
import { SubSink } from 'subsink';
import { environment } from '../../../environments/environment';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { InstructorService } from '../../services/instructor.service';
import { Router, RouterModule } from '@angular/router';
import { MetatagsService } from '../../services/metatags.service';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { slideConfig } from '../../models/slick.config';
import { TestimonialComponent } from '../../shared/testimonial/testimonial.component';
import { NewsletterComponent } from '../../shared/newsletter/newsletter.component';
import { GetintouchComponent } from '../../shared/getintouch/getintouch.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule, 
    TestimonialComponent, 
    RouterModule, 
    NewsletterComponent,
    GetintouchComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  imageUrl: String;
  features: any;
  homepageCourses: any = [];
  homeCourses: any = [];
  homepagefacultymembers: any;
  partners: any;
  latestnews: any;
  feature: any;
  testimonials: any;
  highlightsimple: any;
  environmentUrl: string = environment.apibaseurl;
  coursedata: any;
  InstructorData: any;
  rssFeed: any;
  public unsubscribe$ = new SubSink()
  metaData: any = [];
  timezone: any;
  twoLettertimezone: any;
  frontPageBanner:any;
  slickConfig: any = slideConfig;
  
  freeCourseBanner: any;
  liveWebinarPass: any;
  achivements:any;
  approval:any;

  freeCourseListing:any = [];
  data: any;
  priceCheck: any;
  forTaxLawCheck: any;
  isActiveCheck: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private meta: Meta,
    private titleService: Title,
    private _instructorService: InstructorService, public sanitizer: DomSanitizer,
    private _commanService: CommonService, private router: Router, private metatagsService: MetatagsService) {
    this.imageUrl = environment.imageEndPoint;
  }

  ngOnInit(): void {
    const timezone = moment.tz.guess();
    const offset = new Date().getTimezoneOffset();
    const timezoneAbbrv = moment().tz(timezone).format('z');
    const firstLetter = timezoneAbbrv.charAt(0);
    const lastLetter = timezoneAbbrv.charAt(timezoneAbbrv.length - 1);
    this.twoLettertimezone = firstLetter + lastLetter;

    this.timezone = timezoneAbbrv;

    this.titleService.setTitle('CPE Warehouse');
    this.environmentUrl = environment.apibaseurl
    this.gethomePageSection();
    this.gethomePageCourses();
    this.homePageFacutltyByGql()
  }

  gethomePageSection() {
    this.unsubscribe$.add(this._commanService.getHomePageSection().subscribe((res: any) => {  

      if (res) {
        this.rssFeed = res?.data?.attributes?.RssFeedUrl;
        this.partners = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.partner-section')[0];
        this.latestnews = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.latest-news')[0];
        this.feature = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.feature-image-bullet-list')[0];
        this.testimonials = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.testimonial')[0];
        this.highlightsimple = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.page-highlight-simple')[0];
        this.coursedata = res?.data?.attributes?.blocks.filter((x: { __component: string, Index: String }) => x.__component === 'blocks.api-section' && x.Index === 'Home>Courses')[0];
        this.InstructorData = res?.data?.attributes?.blocks.filter((x: { __component: string, Index: String }) => x.__component === 'blocks.api-section' && x.Index === 'Home>Instructor')[0];
        this.metatagsService.addSEOTags(res.data.attributes.seo);
        this.frontPageBanner = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.front-page-banner')[0];  
        this.freeCourseBanner = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.free-course-banner')[0];  
        this.liveWebinarPass = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.live-webinar-passout')[0];  
        this.achivements = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.achievement')[0];  
        this.approval = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.approval')[0];          
       
        this._commanService.getlandingpageData(res)
      }
    }));
  }

  sanitize(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content)  
  }

  gethomePageCourses() {

    this.unsubscribe$.add(this._commanService.getHomePageCoursesByGql().subscribe((res: any) => {

      if (res.data.courses.data) {
        this.homepageCourses = res?.data?.courses?.data;
    
        this.homepageCourses.forEach((element: any) => {
          if (element.attributes.price < 1 && this.freeCourseListing.length < 2) {
            this.freeCourseListing.push(element.attributes)
          }
        });
      }
    }));
  }

  /* HOME PAGE FECULTY BY GRAPH QL */

  homePageFacutltyByGql() {
    this.unsubscribe$.add(this._instructorService.getInstructorsForHome().subscribe((res: any) => {
      
      if (res) {
        this.homepagefacultymembers = res.data.instructors.data;
      }
    }))
  }

  rssFeedSection() {
    window.open(this.rssFeed, '_blank');
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe()
  }
}
