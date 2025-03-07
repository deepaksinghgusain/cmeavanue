import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../environments/environment';


const instructorsgeneral = gql
  `query {
    instructors (pagination: { limit: -1 }, filters : { IsActive: { eq: true }  } ) {
      data {
        id
        attributes {
           firstName
          lastName
          bioData
          topics
          email
          IsActive
          image {
            data
            {
              attributes
              {
                name
                caption
                 width	
                height
                url
                previewUrl
                alternativeText
                formats 
                 ext
                
              }
            }
          }
        
        }
      }
    }
  }`;

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  getInstructors() {
    return this.apollo.watchQuery<any>({
      query: instructorsgeneral,
    }).valueChanges;
  }

  getInstructorsForHome() {
    return this.apollo.watchQuery<any>({
      query: this.getInstructorSimplegql(),
    }).valueChanges;
  }

  instructorById(id: any) {
    const _url = environment.apibaseurl + "/api/instructors/" + id + "?populate=*";

    return this.http.get(_url)
  }
  
  bannerText() {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=instructor-listing";

    return this.http.get(_url)
  }

  getAllCourseCatlogSection() {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=course-listing";

    return this.http.get(_url)
  }

  getInstructorSimplegql() {
      return gql`query {
        instructors(filters:{IsActive:{eq:true}}){
          data{
            id
            attributes{
              firstName
              lastName
              shortDesc
              image{
                data{
                  attributes{
                    url
                  }
                }
              }
            }
          }
        }
      }`
  }

  getPackages() {
    const _url = environment.apibaseurl + "/api/packages?populate=deep";

    return this.http.get(_url)
  }
}