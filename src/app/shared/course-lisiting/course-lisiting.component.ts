import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import moment from "moment";

@Component({
  selector: 'app-course-lisiting',
  imports: [CommonModule, NgxPaginationModule, RouterModule],
  templateUrl: './course-lisiting.component.html',
  styleUrl: './course-lisiting.component.css'
})
export class CourseLisitingComponent {
  p: number = 1;
  environmentUrl: string = environment.apibaseurl;
  startDate: any;
  endTime: any;
  startTime: any;
  moment = moment;

  @Input() courses: any[] = [];

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
          label: "Finance",
          value: "finance"
        },
      ]
    }
  ]

}
