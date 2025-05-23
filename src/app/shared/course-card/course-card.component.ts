import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import moment from "moment";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit, OnDestroy {
  @Input() course:any;
  environmentUrl: string = environment.apibaseurl;
  startDate: any;
  endTime: any;
  startTime: any;

  ngOnInit(): void { 
    this.startDate = moment(this.course.startDate).format("dddd MMM d YYYY h:mm a")
    this.startTime = moment(this.course.startDate).format("h:mm a")
    this.endTime = moment(this.course.endDate).format("h:mm a");

    if("attributes" in this.course) {
      this.course = {id: this.course.id , ...this.course.attributes}
    }
  }

  ngOnDestroy(): void {
    this.course = {};
  }
}
