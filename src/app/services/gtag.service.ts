import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

declare const gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GtagService {

  constructor(private _route: ActivatedRoute, private router: Router) { }

  pushTag(gtmtag: any) {
    // gtag('config',environment.GA_TRACKING_ID, gtmtag);
  }

  pushEvent(eventname: string, gtmtag: any) {
    // gtag('event', eventname, gtmtag)
  }
}
