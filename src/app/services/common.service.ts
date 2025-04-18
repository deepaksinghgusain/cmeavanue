import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../environments/environment';
import { BehaviorSubject, throwError } from 'rxjs';
import { GraphQLError } from 'graphql';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private apollo: Apollo) { }


  private data = new BehaviorSubject<any>(null);
  commanData = this.data.asObservable();


  private coursesdata = new BehaviorSubject<any>(null);
  commanCoursesdata = this.coursesdata.asObservable();

  private instructorData = new BehaviorSubject<any>(null);
  commaninstructorData = this.instructorData.asObservable();

  private courseCatlog = new BehaviorSubject<any>(null);
  commanCourseCatlog = this.courseCatlog.asObservable();


  private footerdata = new BehaviorSubject<any>(null);
  commanfooterdata = this.footerdata.asObservable();

  private cartQty = new BehaviorSubject<any>(0);
  commanCartQtydata = this.cartQty.asObservable();

  getHomePageSection() {
    const _url = environment.apibaseurl + "/api/homepage?populate=deep";

    return this.http.get(_url)
  }

  getHomePageCourses() {
    const _url = environment.apibaseurl + "/api/courses?populate=deep&filters[isActive][$eq]=true&filters[forTaxLaw][$eq]=true";
    return this.http.get(_url)
  }

  getHomePageCoursesByGql() {

    return this.apollo.watchQuery<any>({
      query: this.getCoursesList(),
    }).valueChanges;
  }

  gethomePagefacultymembers() {
    const _url = environment.apibaseurl + "/api/instructors?populate=deep";

    return this.http.get(_url)
  }

  getHeader() {
    const _url = environment.apibaseurl + "/api/global?populate=deep";

    return this.http.get(_url)
  }

  getHeroSection(page: string, slug: string) {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=" + slug;

    return this.http.get(_url)
  }

  getAboutus() {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=about-us";
    return this.http.get(_url)
  }

  cancellationPolicy() {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=cancellation-policy";

    return this.http.get(_url)

  }

  getPolicy() {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=privacy-policy";

    return this.http.get(_url)

  }

  getTermofuse() {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=terms-of-use";

    return this.http.get(_url)

  }
  getPaymentTermContent() {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=payment-terms";

    return this.http.get(_url)
  }


  getmakingDifference() {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=making-difference";

    return this.http.get(_url)

  }
  getExamData() {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=exam";

    return this.http.get(_url)

  }
  instructorSection() {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=instructor-listing";

    return this.http.get(_url)

  }

  chatToken(userName: any) {
    return this.http.get(`${environment.apibaseurl}/api/twilio-chat/${userName}`, { responseType: 'text' })
  }


  getLogin() {
    const _url = environment.apibaseurl + "/api/Signinpage?populate=deep";

    return this.http.get(_url)

  }
  getSignup() {
    const _url = environment.apibaseurl + "/api/signup?populate=deep";

    return this.http.get(_url)

  }


  getForums() {
    const _url = environment.apibaseurl + "/api/pages?populate=deep&filters[slug][$eq]=forums";

    return this.http.get(_url)

  }


  setCartQtyObs(qty: any) {

    this.cartQty.next(qty);
  }

  getlandingpageData(res: any) {
    this.data.next(res);
  }


  getCoursespageData(res: any) {
    this.coursesdata.next(res);
  }


  getinstructorData(res: any) {
    this.instructorData.next(res);
  }


  getfooter(res: any) {

    this.footerdata.next(res);
  }

  getCourseCatlog(res: any) {
    this.courseCatlog.next(res);
  }


  getPackagesListByGql() {
    return this.apollo.watchQuery<any>({
      query: this.packageListGql(),
    }).valueChanges;
  }

  throwGraphqlError() {
    return throwError(() => new GraphQLError('Internal server error', {
      extensions: {
        http: {
          status: 500,
          statusText: 'Internal Server Error',
        }
      }
    }));
  }


  packageListGql() {
    return gql`query {
      packages{
        data{
          id
          attributes{
            title
            desc
            price
            slug
            discountedPrice
            createdAt
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

  getCoursesList() {
    return gql`query {
      courses(filters:{isActive:{eq:true}, isFeatured:{eq:true},forTaxLaw:{eq:true}} ) {
        data {
          id
          attributes {
            title
            startDate
            endDate
            timezone
            price
            keywords
            slug
            shortDesc
            credit
            image{
              data{
                attributes{
                  url
                }
              }
            }

            instructors{
                data{
                  attributes{
                    firstName
                    lastName
                    image {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                }
              }
            }
          }
        }
      }
    }`
  }
}
