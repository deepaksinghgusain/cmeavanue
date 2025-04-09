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
