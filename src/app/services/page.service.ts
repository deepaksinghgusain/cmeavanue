import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  baseUrl = environment.apibaseurl

  constructor(private http: HttpClient) { }


  getCourseDetailPage() {
    return this.http.get(`${this.baseUrl}/api/pages?populate=deep&filters[slug][$eq]=course-detail`)
  }

  getPageCMSContent(slug: string) {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=" + slug;

    return this.http.get(_url)
  }


}
