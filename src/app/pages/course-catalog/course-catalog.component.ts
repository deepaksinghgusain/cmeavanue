import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SubSink } from 'subsink';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import moment from 'moment';
import { defaultOwlOptions } from '../../utlls/default-owl-options';
import { CourseService } from '../../services/course.service';
import { InstructorService } from '../../services/instructor.service';
import { MetatagsService } from '../../services/metatags.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-course-catalog',
  imports: [CommonModule],
  templateUrl: './course-catalog.component.html',
  styleUrl: './course-catalog.component.css'
})
export class CourseCatalogComponent implements OnInit, OnDestroy {
  courseListing: any = [];
  LiveCourseListing: any = [];
  FreeCourseListing: any = [];
  data: any = [];
  priceCheck: any;
  forTaxLawCheck: any;
  isActiveCheck: any;
  environmentUrl: string = '';
  instructorData: any;
  imageUrl: string;
  questionsection: any;
  packageDealSection: any;
  instructorSection: any;
  heading: any;
  herosimpleSection: any;
  packagedealData: any;
  courseId: any;
  courseSlug: any;
  search = "";
  noRecords = false;
  courses = [];
  public unsubscribe$ = new SubSink()
  metaData: any = [];
  renderer: any;
  heroSection: any;
  timezone: any;
  twoLettertimezone: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private courseService: CourseService,
    private sanitizer: DomSanitizer,
    private _instructorService: InstructorService,
    private metaService: MetatagsService,
    private cd: ChangeDetectorRef) {
    this.imageUrl = environment.imageEndPoint;
  }

  ngOnInit(): void {
    const timezone = moment.tz.guess();
    const offset = new Date().getTimezoneOffset();
    console.log('timezone', timezone)
    const timezoneAbbrv = moment().tz(timezone).format('z');
    const firstLetter = timezoneAbbrv.charAt(0);
    const lastLetter = timezoneAbbrv.charAt(timezoneAbbrv.length - 1);
    this.twoLettertimezone = firstLetter + lastLetter;

    this.timezone = timezoneAbbrv;

    this.environmentUrl = environment.apibaseurl
    if (isPlatformBrowser(this.platformId)) {
      this.renderer = isPlatformBrowser(this.platformId) ? "Browser" : "Server";
      console.log('Rendered COurse List By', this.renderer);

      this.getCourseListing()
      this.getinstructorListing();

      this.getPackagedealListing();
      // this.custommembers1.margin = 70;

      let data = {
        name: 'static name',
        content: 'static content'
      }
      this.metaData.push(data)
      this.metaService.addTags(this.metaData);
    }
    this.getPageContent();
  }

  sanitize(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content)
  }

  getCourseListing() {
    this.courseService.getAllCoursesForLive().subscribe((res: any) => {
      console.log(res);
      
      if (res) {

        this.courseListing = res?.data?.courses?.data;
        this.LiveCourseListing = this.courseListing.filter((element: any) => element.attributes.category.data.attributes.title.toLowerCase() == 'live' && element?.attributes?.price != 0);
        this.FreeCourseListing = this.courseListing.filter((element: any) => element?.attributes?.price === 0);
        this.cd.detectChanges();
      } else {
        this.courseListing = []
        this.cd.detectChanges();
      }
    }, (error: any) => {
      console.log('error in fetching course listing', error)
    })
  }


  getinstructorListing() {
    this.unsubscribe$.add(this._instructorService.getInstructors().subscribe((res: any) => {
      if (res) {
        this.instructorData = res.data.instructors.data;
      }
    }, (error: any) => {
      console.log('error in fetching instructor listing', error)
    }
    ))
  }

  getPackagedealListing() {
    this.unsubscribe$.add(this.courseService.getAllPackages().subscribe((res: any) => {
      if (res) {
        this.packagedealData = res.data.packages.data;
      }
    }, (error: any) => {
      console.log('error in fetching package listing', error)
    }))
  }


  getPageContent() {
    this.unsubscribe$.add(this._instructorService.getAllCourseCatlogSection().subscribe((res: any) => {
    
      
      if (res) {
        this.heroSection = res?.data[0]?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.hero-simple')[0];
        this.questionsection = res?.data[0]?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.page-question-section')[0];
        this.heading = res?.data[0]?.attributes?.blocks.filter((x: { __component: string, Index: String }) => x.__component === 'blocks.api-section' && x.Index === 'Course>Courses')[0];
        this.packageDealSection = res?.data[0]?.attributes?.blocks.filter((x: { __component: string, Index: String }) => x.__component === 'blocks.api-section' && x.Index === 'Catalogue>Packages')[0];
        this.instructorSection = res?.data[0]?.attributes?.blocks.filter((x: { __component: string, Index: String }) => x.__component === 'blocks.api-section' && x.Index === 'Catalogue>Instructors')[0];
        this.metaService.addSEOTags(res?.data[0]?.attributes?.seo);
        this.cd.detectChanges();
        
        console.log(res);
        console.log(this.heroSection);
        
  
      }
    }))
  }

  searchTitle(search: any) {
    this.LiveCourseListing = []
    this.FreeCourseListing = []

    if (search !== '') {
      this.courseService.getAllCoursesForLive(search).subscribe((res: any) => {

        console.log(res.data.courses.data)
        let courseListing = [];
        this.LiveCourseListing = []
        this.FreeCourseListing = []
        if (res) {
          courseListing = res.data.courses.data
          courseListing.forEach((element: any) => {
            this.data = element?.attributes?.category?.data?.attributes?.title
            this.priceCheck = element?.attributes?.price;
            this.forTaxLawCheck = element?.attributes?.forTaxLaw;
            this.isActiveCheck = element?.attributes?.isActive;
            if ((this.data != null || this.data != undefined) && this.data === 'Live' && this.priceCheck > 0 && this.forTaxLawCheck === true && this.isActiveCheck === true) {

              this.LiveCourseListing.push(element)

            }
            if (this.priceCheck < 1 && this.forTaxLawCheck === true && this.isActiveCheck === true) {

              this.FreeCourseListing.push(element)
            }
          });
        }
      });
    } else {
      this.getCourseListing()
    }

    this.courseService.getAllCourses(search).subscribe((res: any) => {
      this.courseListing = res.data.courses.data
    })
  }
  convertIntoFloat(n: any) {
    if (n !== null) {
      let x = parseFloat(n);
      let res = x.toFixed(2);
      return res;
    } else {
      return '0.00';
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe()
  }
}
