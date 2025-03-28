import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';
import { MetatagsService } from '../../services/metatags.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  @Input() backgroundImageurl = 'background-image:url(../../../assets/params/images/banner/hero-image.png);';
  dependencies: any;
  features: any;

  id: number;
  getabouteam: any;
  heroSampleSection: any;
  ourValueSection: any;
  getFromCpe: any;
  getRecommendations: any;
  getQuestionsSection: any;

  aboutFirst: any;
  portfolio: any;
  mission: any;
  values: any;
  commitment: any;

  imageUrl: any = environment.imageEndPoint
  staticSection: any;
  markdowndata: any;
  //  modalService: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private meta: Meta,
    private landingPageService: CommonService,
    private metatagsService: MetatagsService
  ) {

    this.id = 0;
  }

  ngOnInit(): void {
    this.getaboutusData()
  }


  getaboutusData() {

    this.landingPageService.getAboutus().subscribe((res: any) => {

      if (res) {
        this.aboutFirst = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.about-first')[0]
        this.commitment = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.commitment')[0]
        this.values = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.values')[0]
        this.portfolio = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.portfolio')[0]
        this.mission = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.mission')[0]
        
        console.log(this.commitment);
        
      }

      this.metatagsService.addSEOTags(res?.data[0]?.attributes?.seo);
      this.markdowndata = this.staticSection.description
    });
  }
}
