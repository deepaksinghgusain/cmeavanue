import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionMenuOutline, ionClose } from '@ng-icons/ionicons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


@Component({
  selector: 'app-header',
  imports: [NgIcon, CommonModule, FormsModule, AutocompleteLibModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  viewProviders: [provideIcons({ ionMenuOutline , ionClose })]
})
export class HeaderComponent implements OnInit {
  headerData: any;
  keyword = 'name';
  activeClass: boolean = false;
  data: any = []
  tokenCheck: any = false;
  @ViewChild('auto') auto: any;
  coursesData: any;
  footerData: any;
  cartQty: any = "";
  cartData: any;
  // cartId = Number(localStorage.getItem('cartId')) || 0;
  headerlogo: any;
  environmentUrl: string = environment.apibaseurl;

  toggleMobileIcon: boolean = true;
  toggleMobileClass: string = "left-[-100%]";

  search: string = '';


  constructor(
    private commonService: CommonService, 
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.commonService.getHeader().subscribe({
      next: (response: any) => {

        this.headerData = response?.data?.attributes?.navigation;
        this.commonService.getfooter(response);
        this.headerlogo = `${this.environmentUrl}` + response?.data?.attributes?.headerLogo?.data?.attributes?.url;

        if (this.headerlogo == undefined) {
          this.headerlogo = "/assets/params/images/logo/logo.svg"
        }
      }
    })
  }
  
  getCartQty() {
    this.commonService.commanCartQtydata.subscribe((res: any) => {

      this.cartQty = res;
    });
  }

  tokenExists() {
    const isTokenExist = localStorage.getItem('token')
    if (isTokenExist) {
      this.tokenCheck = true;
    } else {
      this.tokenCheck = false;
    }
  }


  getcourses() {
    this.courseService.getAllCourseForSearch('').subscribe((res: any) => {
      this.data = [];
      if (res) {
        res.data.courses.data.forEach((element: any) => {
          this.data.push({
            id: element.id,
            name: element.attributes?.title,
            slug: element.attributes?.slug
          })
        });
      }
    });
  }


  selectEvent(item: any) {
    this.router.navigate(['/course/course-detail/' + item.slug])
    setTimeout(() => {
      this.showhideSerachbox()
    }, 1000);

  }

  onChangeSearch(val: string) {
    this.getcourses()
  }

  onFocused(e: any) {
    this.auto.close();
    // if(e.target.value ==''){
    // }
  }

  showhideSerachbox() {
    this.activeClass = !this.activeClass
  }


  onMenuToggle(event: any) {
    
    this.toggleMobileIcon = !this.toggleMobileIcon;

    this.toggleMobileClass = this.toggleMobileClass === "left-[-100%]" ? "left-[0%]" : "left-[-100%]";
  }
}
