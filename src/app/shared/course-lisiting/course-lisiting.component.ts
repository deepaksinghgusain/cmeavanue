import {  AfterViewChecked,  ChangeDetectorRef, Component, Input,  } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-lisiting',
  imports: [CourseCardComponent, CommonModule],
  templateUrl: './course-lisiting.component.html',
  styleUrl: './course-lisiting.component.css'
})
export class CourseLisitingComponent implements AfterViewChecked {
  totalPages: number = 1;
  currentPage: number = 1;
  pageChange: number = 1;
  totalItemPerPage: number = 9;
  pages : number[] = [1,2,3,4,5,6,7,8,9,10];
  currentCourses: any = [];

  @Input() courses: [] = [];

  filters = [
    {
      label: 'Price',
      name: 'price',
      icon: '/assets/images/price-icon.png',
      showChildren: false,
      children: [
        {
          label: "Free",
          value: "Free"
        },
        {
          label: "Premium",
          value: "Premium"
        }
      ]
    },
    {
      label: 'CPE Credit',
      name: 'credit',
      icon: '/assets/images/credit-icon.png',
      showChildren: false,
      children: [
        {
          label: "1-2 credit",
          value: "1-2"
        },
        {
          label: "2-4 credit",
          value: "2-4"
        },
        {
          label: "4-8 credit",
          value: "4-8"
        },
        {
          label: "8+ credit",
          value: "8-+"
        },
      ]
    },
    {
      label: 'Field To Study',
      name: 'field-to-study',
      icon: '/assets/images/field-to-study.png',
      showChildren: false,
      children: [
        {
          label: "Accounting",
          value: "accounting"
        },
        {
          label: "Auditing",
          value: "auditing"
        },
        {
          label: "Business Law",
          value: "business-law"
        },
        {
          label: "Economics",
          value: "economics"
        },
        {
          label: "Cinance",
          value: "finance"
        },
      ]
    }
  ]

  constructor(private cd: ChangeDetectorRef){}

  goToPage(page: number) {    
    
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page; 

      let data = this.courses.slice((this.currentPage - 1) * this.totalItemPerPage, this.totalItemPerPage * (this.currentPage) );

      this.currentCourses = data;

      this.cd.detectChanges();      
    }
  }

  ngAfterViewChecked(): void {
    this.totalPages = Math.ceil(this.courses.length/ 9);
    
    this.currentCourses = this.courses.slice(0, this.totalItemPerPage);
    
    this.cd.detectChanges();
  }
}
