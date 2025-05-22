import { AfterContentChecked,  AfterContentInit,  AfterViewChecked,  ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import moment from "moment";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-lisiting',
  imports: [CommonModule, NgxPaginationModule, RouterModule, ReactiveFormsModule],
  templateUrl: './course-lisiting.component.html',
  styleUrl: './course-lisiting.component.css'
})
export class CourseLisitingComponent implements OnInit,  AfterViewChecked {
  @Input() courses: any[] = [];

  form : FormGroup = new FormGroup({
    price : new FormControl(null),
    credit: new FormControl(null),
    field_to_study: new FormControl(null)
  })

  contentLoaded: boolean = true;

  p: number = 1;
  environmentUrl: string = environment.apibaseurl;
  startDate: any;
  endTime: any;
  startTime: any;
  moment = moment;
  filterCourse:any = [];

  constructor(private cd: ChangeDetectorRef) {}

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
      name: 'field_to_study',
      icon: '/assets/images/field-to-study.png',
      showChildren: false,
      children: [
        {
          label: "Accounting",
          value: "Accounting"
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
          label: "Finance",
          value: "finance"
        },
      ]
    }
  ]

  ngOnInit(): void {

    this.form.valueChanges.subscribe((value) => {
      this.filterCourse = this.courses.filter((course:any) => {
        
        if(value.credit !== null && value.field_to_study !== null) {
          let credit : string = "" + value.credit;
          
          let startCreditPoint = parseInt(credit.split("-")[0]) ;
          let endCreditPoint = parseInt(credit.split("-")[1]);
          
          if(
            parseInt(course.attributes.credit) >= startCreditPoint &&  
            parseInt(course.attributes.credit) < endCreditPoint && 
            value.field_to_study === course.attributes.fieldOfStudy ) {
            return course
          }
        } else if(value.credit !== null) {
          let credit : string = "" + value.credit;
          
          let startCreditPoint = parseInt(credit.split("-")[0]) ;
          let endCreditPoint = parseInt(credit.split("-")[1]);
          
          if(
            parseInt(course.attributes.credit) >= startCreditPoint &&  
            parseInt(course.attributes.credit) < endCreditPoint ) {
            return course
          }
        } else if(value.field_to_study !== null) {
          console.log(course);
          
          
          console.log(value?.field_to_study?.toString().toLowerCase(),  course.attributes?.fieldOfStudy?.toLowerCase());
          
          
          if(value.field_to_study && value?.field_to_study?.toString().toLowerCase() === course.attributes?.fieldOfStudy?.toLowerCase()) {
            return course
          }
        }
      })

      this.contentLoaded = false;    

      this.cd.detectChanges();
    })
  }

  ngAfterViewChecked(): void {

    if(this.contentLoaded) {

      this.filterCourse = this.courses;   
    }

    this.cd.detectChanges();
  }
}
