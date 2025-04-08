import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubSink } from 'subsink';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../../services/course.service';
import { environment } from '../../../environments/environment';
import { CourseCardComponent } from '../../shared/course-card/course-card.component';

@Component({
  selector: 'app-course-catalog',
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-catalog.component.html',
  styleUrl: './course-catalog.component.css'
})
export class CourseCatalogComponent implements OnInit, OnDestroy {
  totalPages: number = 1;
  currentPage: number = 1;
  pageChange: number = 1;

  data: any;
  priceCheck: any;
  forTaxLawCheck: any;
  isActiveCheck: any;

  LiveCourseListing: any = [];
  slefStudyCourseListing: any = [];
  ebookCourseListing: any = [];

  FreeCourseListing: any = [];
  environmentUrl: string = '';
  imageUrl: string;
  courses = [];
  public unsubscribe$ = new SubSink()

  tab: string = "live";

  constructor(
    private courseService: CourseService,
    private sanitizer: DomSanitizer) {
    this.imageUrl = environment.imageEndPoint;
  }

  ngOnInit(): void {

    this.environmentUrl = environment.apibaseurl

    this.getLiveCourse();
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

  get pages(): number[] {
    const pages: number[] = [];
    const range = 2; // pages to show before/after current
    const start = Math.max(1, this.currentPage - range);
    const end = Math.min(this.totalPages, this.currentPage + range);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange = page
    }
  }
}
