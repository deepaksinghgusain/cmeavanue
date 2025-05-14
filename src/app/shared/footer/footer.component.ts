import { ChangeDetectorRef, Component } from '@angular/core';
import { Client as ConversationsClient } from "@twilio/conversations";
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { TwakComponent } from '../twak/twak.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, TwakComponent, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  imageUrl: string = environment.imageEndPoint;
  footerData: any;
  socialData: any;
  footerTop: any;
  footerMiddle: any;
  footerBottom: any;
 
  constructor(
    private commonService: CommonService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getfooterSection();
  }

  getfooterSection() {
    this.commonService.commanfooterdata.subscribe((res: any) => { 
      if (res) {
        this.footerTop = res.data.attributes.footer_top;
        this.footerMiddle = res.data.attributes.footer_middle;
        this.footerBottom = res.data.attributes.footer_bottom;

        console.log(this.footerMiddle);
        
        this.cd.detectChanges();
      }
    })
  }
}
