import { Component } from '@angular/core';
import { SubSink } from 'subsink';
import { PageService } from '../../services/page.service';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { CourseService } from './../../services/course.service';

@Component({
  selector: 'app-bundleandsubscription',
  imports: [RouterModule],
templateUrl: './bundleandsubscription.component.html',
  styleUrl: './bundleandsubscription.component.css'
})
export class BundleandsubscriptionComponent {

  heroImageSection:any;
  accreditedPartners:any;
  otherCourseBanner:any;

  environmentUrl: string = '';
  imageUrl: string;
  public unsubscribe$ = new SubSink()

  tab: string = "live";
  loading:boolean = false;
  packagedealData:any;

  constructor(
    private courseService:CourseService,
    private pageService: PageService) {
    this.imageUrl = environment.imageEndPoint;
    this.getPageData();
  }

  ngOnInit(): void {

    this.environmentUrl = environment.apibaseurl

    this.getPackages();
  }

  getPageData() {
    this.loading = true;

    this.unsubscribe$.add(this.pageService.getPageContent('bundle-and-subscription').subscribe((res: any) => {
      this.loading = false;      
      this.heroImageSection = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.bundle-and-subscription')[0];
      this.accreditedPartners = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.accredited-partners')[0];      
      this.otherCourseBanner = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.other-course-banner')[0]; 
    }))
  }

  getPackages() {
    this.unsubscribe$.add(this.courseService.getAllPackages().subscribe((res: any) => {
      if (res) {
        this.packagedealData = res.data.packages.data;
        console.log(this.packagedealData);
        
      }
    }, (error: any) => {
      console.log('error in fetching package listing', error)
    }))
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe()
  }
}
