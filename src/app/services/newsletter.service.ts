import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  baseUrl = environment.apibaseurl

  constructor(private http: HttpClient) { }

  addNewsletter(data: any) {
    return this.http.post(`${this.baseUrl}/api/subscriptions`, {data})
  }
}
