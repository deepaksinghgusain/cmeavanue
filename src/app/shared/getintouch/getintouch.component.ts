import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { SubSink } from 'subsink';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-getintouch',
  imports: [RouterModule],
  templateUrl: './getintouch.component.html',
  styleUrl: './getintouch.component.css'
})
export class GetintouchComponent {
  getInTouch: any;
  public unsubscribe$ = new SubSink()
  imageUrl = environment.imageEndPoint;

  constructor(private _commonService: CommonService) { }


  ngOnInit(): void {
    this.gethomePageSection();
  }

  gethomePageSection() {
    this.unsubscribe$.add(this._commonService.getHomePageSection().subscribe((res: any) => {
      if (res) {
        this.getInTouch = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.get-in-touch')[0];
      }
    }));
  }

}
