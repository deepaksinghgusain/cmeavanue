import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionMenuOutline, ionClose } from '@ng-icons/ionicons';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [NgIcon, CommonModule],
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
  searchbox: boolean = false;
  footerData: any;
  cartQty: any = "";
  cartData: any;
  // cartId = Number(localStorage.getItem('cartId')) || 0;
  headerlogo: any;
  environmentUrl: string = environment.apibaseurl;

  toggleMobileIcon: boolean = true;
  toggleMobileClass: string = "left-[-100%]";


  constructor(private commonService: CommonService) { }

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

  onMenuToggle(event: any) {
    
    this.toggleMobileIcon = !this.toggleMobileIcon;

    this.toggleMobileClass = this.toggleMobileClass === "left-[-100%]" ? "left-[0%]" : "left-[-100%]";
  }
}
