import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private apollo: Apollo) { }

  getTestimonial() {
    return this.apollo.watchQuery<any>({
      query: this.testimonialListGql()
    }).valueChanges;
  }

  testimonialListGql() {
    return gql`query {
      testimonials{
        data{
          id
          attributes{
            name
           	designation
            message
            rating
            profile_image {
              data {
                attributes {
                  url
                }
              }
            }
           
          }
        }
      }
    }`
  }
}
