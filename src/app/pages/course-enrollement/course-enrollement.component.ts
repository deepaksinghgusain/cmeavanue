import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PageService } from '../../services/page.service';
import { CourseService } from '../../services/course.service';
import { GtagService } from '../../services/gtag.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from '../../services/cart.service';
import { CommonService } from '../../services/common.service';
import { MetatagsService } from '../../services/metatags.service';
import { SubSink } from 'subsink';
import { environment } from '../../../environments/environment';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import moment from 'moment';
import { SeoTags } from '../../models/meta-tags';
import { CourseCardComponent } from '../../shared/course-card/course-card.component';
import { TabComponent } from '../../shared/tab/tab.component';

@Component({
  selector: 'app-course-enrollement',
  imports: [RouterModule, CommonModule, CourseCardComponent, TabComponent],
  templateUrl: './course-enrollement.component.html',
  styleUrl: './course-enrollement.component.css'
})
export class CourseEnrollementComponent implements OnInit, OnDestroy {

  apiSection: any;
  heroImageSection: any
  courseData: any;
  courseTabContent: any;
  givingBackTabContent: any;
  faqContent: any
  daysToGo: any;
  hoursToGo: any;
  imageUrl: any = environment.imageEndPoint
  seats = 1;
  backGroundImageUrl: any;
  allCourseData: any;
  keywords: any;
  relatedCourses: any = []
  courseId: any;
  courseTabs: any;
  instructorArray: any = []
  coursesDetail: any;
  showTabContent: any = 0;
  nullImage: any;
  faculties: any = []
  footerData: any;
  CartItem: any = [];
  totalPrice: any = 0;
  finalPrice: any = 0;
  cartId = Number(localStorage.getItem('cartId')) || 0;
  tabImageUrl: any;
  cartData: any;
  courseListingContent: any = [];
  slug: any = '';
  userCourseData: any;
  renderer: any;
  isPurchased = false;
  timezone: any;
  sharingUrls = {
    fb: '',
    instagram: '',
    linkedin: '',
    twitter: ''
  };
  courseCategory: any;
  twoLettertimezone: any;
  countDownIntervalInstance: NodeJS.Timer | undefined;
  instructor: any;
  public unsubscribe$ = new SubSink()

  accreditedPartners:any;
  sponsorship:any;

  courseOutline:any;
  reviews:any;
  creditAndInfo:any;
  relatedBlock:any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private pageService: PageService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private gtagservice: GtagService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private cartService: CartService,
    private _commannService: CommonService,
    private metaService: MetatagsService,
  ) {
    
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.slug = params['slug']

      this.getCourseData(this.slug);
      

      this.getCoursePageData()
      this.cartData = {
        "data": {
          "userId": Number(localStorage.getItem('userId')),
          "total": 0,
          "discountCode": "",
          "discountPrice": 0,
          "finalPrice": 0,
          "CartItem": []
        }
      }
    })

    
    this.getPageData();

    if (isPlatformBrowser(this.platformId)) {
      
      const timezone = moment.tz.guess();
      const offset = new Date().getTimezoneOffset();

      const timezoneAbbrv = moment().tz(timezone).format('z');
      const firstLetter = timezoneAbbrv.charAt(0);
      const lastLetter = timezoneAbbrv.charAt(timezoneAbbrv.length - 1);
      this.twoLettertimezone  = firstLetter + lastLetter;

      this.timezone = timezoneAbbrv;
     
      if (this.cartId > 0)
        this.unsubscribe$.add(this.cartService.getCart(this.cartId).subscribe({
          next: (resp: any) => {
            let cartResponseItems = resp?.data?.attributes;
            this.cartData.data = resp.data.attributes;
            this._commannService.setCartQtyObs(resp?.data?.attributes?.CartItem.length)
          },
          error: (res: any) => {
            this.cartData.data.CartItem = [];
            this.cartData.data.finalPrice = 0;
            this.cartData.data.total = 0;

            localStorage.setItem('cartId', '0');
            localStorage.setItem('cartQty', '0');
          }
        }));

    } else {

      this.getCourseDetails(this.slug); 

    }    
  }



  getCoursePageData() {

    this.unsubscribe$.add(this.pageService.getCourseDetailPage().subscribe((res: any) => {
      this.heroImageSection = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.hero-image-with-button')[0];
      this.apiSection = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.api-section')[0];
      this.backGroundImageUrl = environment.imageEndPoint + this.heroImageSection?.ackgroundImage?.data?.attributes?.formats?.large?.url
      this.relatedBlock = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.related-block')[0];      
    
    }))
  }

  getCourseDetails(slug: string) {

    this.unsubscribe$.add(this.courseService.getcoursesBySlug(slug).subscribe((res: any) => {
      
      this.coursesDetail = res.data.courses;
      this.courseId = this.coursesDetail?.data[0]?.id;
      
      this.courseData = this.coursesDetail?.data[0]?.attributes;
      if (this.courseData) {
        const seoObj: Partial<SeoTags> = {
          metaTitle: this.courseData.title,
          metaImage: this.courseData.image,
          metaDescription: this.courseData.title,
          metaSocial: [
            {
              socialNetwork: "Facebook",
              title: this.courseData.title,
              description: this.courseData.title
            },
            {
              socialNetwork: "Twitter",
              title: this.courseData.title,
              description: this.courseData.title
            }
          ]
        }

        if (this.courseData.keywords) {
          seoObj.keywords = this.courseData.keywords
        }

        this.metaService.addSEOTags(seoObj as any);
      } else {
        this.metaService.clearSEOTags();
      }
      if (typeof window !== 'undefined') {

        //const pageUrl = encodeURIComponent(window.location.href);
        const pageUrl = encodeURIComponent(window.location.href)
        this.sharingUrls.fb = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        this.sharingUrls.linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${encodeURIComponent(this.courseData.title)}&source=${pageUrl}`;

        this.sharingUrls.twitter = `https://twitter.com/intent/tweet?url=${pageUrl}`;
      }
    }))
  }

  getCountDown(stTime: any) {
    if (isPlatformBrowser(this.platformId)) {
      let countDownDate = new Date(`${stTime}`).getTime();
      this.countDownIntervalInstance = setInterval(() => {
        var presentDate = new Date().getTime();
        var timeInterval = countDownDate - presentDate;
        this.daysToGo = Math.floor(timeInterval / (1000 * 60 * 60 * 24));
        this.hoursToGo = Math.floor((timeInterval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      })
    }
  }
  sanitize(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content)
  }
  getCourseData(slug: any) {

    this.unsubscribe$.add(this.courseService.getcoursesBySlug(slug).subscribe((res: any) => {

      this.coursesDetail = res.data.courses;
      this.courseId = this.coursesDetail?.data[0]?.id;
     
      this.courseData = this.coursesDetail?.data[0]?.attributes;
      this.instructor = this.courseData.instructors.data[0]?.attributes;
      
      this.courseCategory = this.coursesDetail?.data[0]?.attributes?.category?.data?.attributes?.title;
      this.gtagservice.pushEvent('view_item',
        {
          "id": this.courseId,
          "name": this.courseData?.title,
          "quantity": this.seats,
          "price": this.courseData?.price,
          "category": 'TaxCourse',
          "brand": "CPE",
          "list_name": undefined,
          "list_position": 0,
          "variant": undefined,
        }
      );
      if (this.courseData) {
        const seoObj: Partial<SeoTags> = {
          metaTitle: this.courseData.title,
          metaImage: this.courseData.image,
          metaDescription: this.courseData.title,
          metaSocial: [
            {
              socialNetwork: "Facebook",
              title: this.courseData.title,
              description: this.courseData.title
            },
            {
              socialNetwork: "Twitter",
              title: this.courseData.title,
              description: this.courseData.title
            }
          ]
        }

        if (this.courseData.keywords) {
          seoObj.keywords = this.courseData.keywords
        }

        this.metaService.addSEOTags(seoObj as any);
      } else {
        this.metaService.clearSEOTags();
      }
      if (typeof window !== 'undefined') {
        const pageUrl = encodeURIComponent(window.location.href);
        this.sharingUrls.fb = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;

        this.sharingUrls.linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${encodeURIComponent(this.courseData?.title)}&source=${pageUrl}`;
        this.sharingUrls.twitter = `https://twitter.com/intent/tweet?url=${pageUrl}`;
      }
      if (this.courseData?.category?.data?.attributes?.title == 'Live') {
        this.getCountDown(this.courseData.startDate)
      }

      this.courseTabContent = this.courseData?.tabs[0]?.content
      
      this.givingBackTabContent = this.courseData?.tabs[1]?.content
     
      this.courseData?.instructors?.data?.forEach((element: any, index: number) => {

        let facultyTitle = '';
        let imageurl = ''
        let biodata = ''

        if (element?.attributes?.shortDesc == '') {

          facultyTitle = element?.attributes?.firstName
        }
        else if ((element?.attributes?.firstName == null || element?.attributes?.firstName == undefined) || (element?.attributes?.shortDesc == null || element?.attributes?.shortDesc == undefined)) {
          facultyTitle = "";
        }
        else
          facultyTitle = element?.attributes?.firstName + " " + element?.attributes?.lastName + "-" + " " + element?.attributes?.shortDesc;

        if (element?.attributes?.image?.data?.attributes?.url === undefined) {
          imageurl = ""
        } else {
          imageurl = element?.attributes?.image?.data?.attributes?.url
        }
        biodata = element?.attributes?.bioData

        this.faculties.push({
          'title': facultyTitle,
          'bio': biodata,
          'imgurl': imageurl
        })
      });
      
      this.courseTabs = this.courseData?.tabs

      
      
      let tabcomponent = this.courseOutline = this.courseTabs?.filter((item: { index: string; }) => item?.index === "Outline") || {};

      this.creditAndInfo = this.courseTabs?.find((item:any) => item?.index === "Other") || {};

      if (tabcomponent != undefined || tabcomponent != null && tabcomponent[0]?.image != null || tabcomponent[0]?.image != undefined) {
        if (tabcomponent[0]?.image["data"] != null)
          this.tabImageUrl = this.imageUrl + tabcomponent[0].image['data']["attributes"].url;
        else
          this.tabImageUrl = this.imageUrl + this.courseData?.image?.data?.attributes?.url;
      }
      else
        this.tabImageUrl = this.imageUrl + this.courseData?.image?.data?.attributes?.url;

      this.keywords = this.courseData?.keywords === null ? '' : this.courseData?.keywords?.split(',') || '';

      if (this.keywords != '')
        this.getAllRelatedCourses()
    }))
  }

  getAllRelatedCourses() {
    this.relatedCourses = []
    this.unsubscribe$.add(this.courseService.getAllCourses().subscribe((res: any) => {
      this.allCourseData = res.data
      
      // related course :-
      const coursesArray = res.data.courses.data;
      
      if (this.keywords) {
        this.keywords?.forEach((element: any) => {

          
          const filteredResult = coursesArray.filter((item: any) => {
           return  (item?.attributes?.title?.toString().toLowerCase().includes(element.toString().toLowerCase()))
            && (item.attributes?.category?.data?.attributes?.title == this.courseCategory)
          }
          )
         
          filteredResult.forEach((element: any, index: number) => {
            const facultyname = this.getInstructorName(element?.attributes?.instructors)
            this.relatedCourses.push({
              'title': element?.attributes?.title,
              'startDate': element?.attributes?.startDate,
              'endDate': element?.attributes?.endDate,
              'image': element?.attributes?.image?.data?.attributes?.url,
              'shortDesc': element?.attributes?.shortDesc,
              'credit': element?.attributes?.credit,
              'slug': element?.attributes?.slug,
              'price': element?.attributes?.price,
              'instructors': element?.attributes?.instructors,
            })
          })          

          if (filteredResult) {

            // removing duplicate array
            this.relatedCourses = this.relatedCourses.filter((item: any, index: number) =>
            this.relatedCourses.indexOf(item) === index)
            this.relatedCourses = this.relatedCourses.filter((item: any) => item.id != this.courseId)
          }
        });

      } else {
        this.relatedCourses = [];
      }
    }))
  }

  getPageData() {

    this.unsubscribe$.add(this.pageService.getPageContent('course-detail').subscribe((res: any) => {      
      this.accreditedPartners = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.accredited-partners')[0];
      this.sponsorship = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.sponsorship')[0];
    }))
  }

  getInstructorName(instructors: any) {
    const name: string[] = []
    instructors.data.forEach((element: any, index: number) => {

      name.push(element?.attributes?.firstName + ' ' + element?.attributes.lastName)
    })

    return name.join(',');
  }

  seatIncrementer() {
    let quantity = this.seats
    if (quantity < 9) {
      quantity = quantity + 1
      this.seats = quantity
    }
    return
  }
  seatDecrementer() {
    let quantity = this.seats

    if (quantity > 1) {
      quantity = quantity - 1
      this.seats = quantity
    }
    return
  }

  openTabContent(index: any) {
    this.showTabContent = index
  }

  goToDetail(id: any) {
    window.open('/course/course-detail/' + id, '_blank');
  }


  addItem(item: any) {
    if (this.cartData.data.CartItem === undefined || this.cartData.data.CartItem === null)
      this.cartData.data.CartItem = [];
    this.cartData.data.CartItem.push(item);
  }

  getcardCount() {
    if (this.cartId > 0)
      this.unsubscribe$.add(this.cartService.getCart(this.cartId).subscribe({
        next: (resp: any) => {
          this._commannService.setCartQtyObs(resp?.data?.attributes?.CartItem.length)
        },
        error: (res: any) => {
          localStorage.setItem('cartId', '0');
          localStorage.setItem('cartQty', '0');
        }
      }));
  }

  getUserCourse(email: any) {

    this.courseService.GetUserSubscribedCourses(email).subscribe((res: any) => {

      this.userCourseData = res?.data.userCourses.data
     
    })
  }



  enrollNow2(selectedCourse: any, template?: any, templateExpired?: any) {
    localStorage.setItem("slug", this.slug)

    // if cart does not exist then create a cart
    const courseid = selectedCourse.data[0]["id"] || 0;
    const price = selectedCourse.data[0]['attributes']['price']
    const category = selectedCourse?.data[0]?.attributes['category']?.data?.attributes['title'] || '';
  
    if (new Date(selectedCourse.data[0].attributes['endDate']) < new Date() && category == 'Live') {
      return;
    }

    if (localStorage.getItem('token')) {
      const email = localStorage.getItem('email') || '';

      // CHECKING COURSE PURCHASED BY USER OR NOT
      // await this.getUserCourse(email)

      this.courseService.checkAlreadyCoursePurchased(courseid, email).subscribe((res: any) => {

        const dts = res?.data.userCourses.data
        this.isPurchased = false
        if (dts.length == 0) {
          this.isPurchased = false  // no course found for the user
        }
        if (dts.length > 0 && dts[0].attributes?.course?.data.id == courseid) {
          this.isPurchased = dts[0].attributes?.course?.data.id == courseid // course already purchased
        }
        if (this.isPurchased) {

        }

        else {

          if (this.cartId == 0 && courseid > 0) {

            this.addItem({
              "courseId": Number(courseid),
              "qty": this.seats,
              "packageId": 0,
              "course": selectedCourse.data[0].attributes,
              "Enrollment": []
            });


            // const totalprice = selectedCourse?.price * this.seats;
            let realPrice: any;
            if ((selectedCourse.data[0].attributes.discount != null && selectedCourse.data[0].attributes.discount != 0)) {
              realPrice = selectedCourse.data[0].attributes.discount
            } else {
              realPrice = selectedCourse.data[0].attributes.price
            }


            const totalprice = realPrice * this.seats;
            this.cartData.data.total = totalprice
            this.cartData.data.finalPrice += totalprice;
            this.unsubscribe$.add(this.cartService.addToCart(this.cartData).subscribe(
              (resp: any) => {
                if (resp.data != null) {

                  this.getcardCount();
                  // SHOW MESSAGE (COURSE ADD SUCCESSFULL)
                  localStorage.setItem('cartId', resp.data.id)
                  this.router.navigateByUrl('/checkout')
                  this.gtagservice.pushEvent('add_to_cart',
                    {
                      "id": courseid,
                      "name": selectedCourse.data[0].attributes?.title,
                      "quantity": this.seats,
                      "price": realPrice,
                      "category": 'TaxCourse',
                      "brand": "CPE",
                      "list_name": undefined,
                      "list_position": 0,
                      "variant": undefined,
                    }
                  );

                }
                else {
                  // SHOW EROR MESSAGE (SOMETHING WENT WRONG)
                }
              }, (err: any) => {
             
              }))
          }

          if (this.cartId > 0) {
            // check if item being selected already exists
            let matchingCourse = this.cartData.data.CartItem.filter((data: any) => data.courseId == courseid)[0] || undefined;
            if (matchingCourse != undefined || matchingCourse != null) {
              // update quantity
              matchingCourse.qty = this.seats
            }
            else {
              let realPrice: any;
              if ((selectedCourse.data[0].attributes.discount != null && selectedCourse.data[0].attributes.discount != 0)) {
                realPrice = selectedCourse.data[0].attributes.discount
              } else {
                realPrice = selectedCourse.data[0].attributes.price
              }

              this.gtagservice.pushEvent('add_to_cart',
                {
                  "id": courseid,
                  "name": selectedCourse.data[0].attributes?.title,
                  "quantity": this.seats,
                  "price": realPrice,
                }
              );
              // its new item to be added
              this.addItem({
                "courseId": Number(courseid),
                "qty": this.seats,
                "course": this.coursesDetail.data[0].attributes,
                "packageId": 0,
                "Enrollment": []
              });
            }
            this.updateTotal();
          }
          this.updateTotal();
          this.updateCart();
        }
      }, (error) => {
     
        
      })

    } else {

      this.addItem({
        "courseId": Number(courseid),
        "qty": this.seats,
        "packageId": 0,
        "course": this.coursesDetail.data[0].attributes,
        "Enrollment": []
      });
      this.updateTotal()
      // const totalprice = selectedCourse?.price * this.seats;
      //const totalprice = selectedCourse.data[0].attributes.price * this.seats;

      // this.cartData.data.total = totalprice
      // this.cartData.data.finalPrice += totalprice;
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
      this.router.navigate(['/auth/login'])
    }
  }


  // update total of cart based on cartitems
  updateTotal() {
    let total = 0;
    this.cartData.data.CartItem.map((ci: any, index: any) => {
      if (ci.course != undefined) {

        if (ci.courseId > 0) {
          total += (ci.course.discount || ci.course.discountedPrice || ci.course.discounted_price) > 0 ? (ci.course.discount * ci.qty || ci.course.discountedPrice * ci.qty || ci.course.discounted_price * ci.qty) : (ci.course.price * ci.qty)
        } else {
          if (ci.course.discounted_price != null && ci.course.discounted_price > 0) {
            total += ci.course.discounted_price * ci.qty;
          } else if (ci.course.price != null && ci.course.price >= 0) {
            total += ci.course.price * ci.qty;
          } else {
            total += ci.course.includedCoursePrice * ci.qty;
          }

        }
      }
    });
    this.cartData.data.total = total
    this.cartData.data.finalPrice = total;

  }

  updateCart() {
    localStorage.setItem('cartQty', this.cartData.data.CartItem.length)
    this._commannService.setCartQtyObs(this.cartData.data.CartItem.length)
    this.unsubscribe$.add(this.cartService.updateCart(this.cartData, this.cartId).subscribe((cartResp: any) => {
      this.getcardCount();
      this.router.navigateByUrl('/learner/checkout');
    }, (err => {
      // debugger
      if (err.error.error.status === 403) {
        this.router.navigate(['/auth/login'])
      }

    })))
  }
  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
    if (this.countDownIntervalInstance) {
      // clearInterval(this.countDownIntervalInstance)
    }
  }
}
