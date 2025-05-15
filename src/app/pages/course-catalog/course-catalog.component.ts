import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubSink } from 'subsink';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../../services/course.service';
import { environment } from '../../../environments/environment';
import { CourseLisitingComponent } from '../../shared/course-lisiting/course-lisiting.component';
import { PageService } from '../../services/page.service';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-course-catalog',
  imports: [
    CommonModule, 
    CourseLisitingComponent, 
    RouterModule, 
    LoadingComponent
  ],
  templateUrl: './course-catalog.component.html',
  styleUrl: './course-catalog.component.css'
})
export class CourseCatalogComponent implements OnInit, OnDestroy {
  data: any;
  priceCheck: any;
  forTaxLawCheck: any;
  isActiveCheck: any;

  heroImageSection:any;
  accreditedPartners:any;
  otherCourseBanner:any;

  LiveCourseListing: any = [];
  slefStudyCourseListing: any = [];
  ebookCourseListing: any = [];

  FreeCourseListing: any = [];
  environmentUrl: string = '';
  imageUrl: string;
  courses = [];
  public unsubscribe$ = new SubSink()

  tab: string = "live";
  loading:boolean = false;

  constructor(
    private courseService: CourseService,
    private pageService: PageService,
    private sanitizer: DomSanitizer) {
    this.imageUrl = environment.imageEndPoint;
    this.getPageData();
  }

  ngOnInit(): void {

    this.environmentUrl = environment.apibaseurl

    this.getLiveCourse();
  }

  getPageData() {
    this.loading = true;

    this.unsubscribe$.add(this.pageService.getPageContent('course-listing').subscribe((res: any) => {
      this.loading = false;      
      this.heroImageSection = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.course-catalog-banner')[0];
      this.accreditedPartners = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.accredited-partners')[0];      
      this.otherCourseBanner = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.other-course-banner')[0];
    }))
  }

  sanitize(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content)
  }

  getLiveCourse() {
    this.courseService.getAllCoursesForLive().subscribe((res: any) => {

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
