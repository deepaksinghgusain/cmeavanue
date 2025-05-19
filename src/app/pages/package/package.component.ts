import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CourseService } from '../../services/course.service';
import { CartService } from '../../services/cart.service';
import { CommonService } from '../../services/common.service';
import { MetatagsService } from '../../services/metatags.service';
import { SeoTags } from '../../models/meta-tags';
import { TabComponent } from '../../shared/tab/tab.component';

@Component({
  selector: 'app-package',
  imports: [RouterModule, TabComponent],
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent implements OnInit {


  slug: any = 1;

  packageData: any;
  packageDetail: any;

  seats: any = 1;
  imageUrl: any = environment.imageEndPoint
  apiSection: any;
  heroImageSection: any
  backGroundImageUrl: any
  packageOutline: any;
  faq: any
  courseId: any;
  totalCoursePrice: any = 0;
  courseCount: number = 0;
  showCourseIncluded: any = true
  CartItem: any = [];
  totalPrice: any = 0;
  finalPrice: any = 0;
  packageId: any;
  actualPrice: any;
  cartData: any;
  PackageCourses: any = []
  cartId = Number(localStorage.getItem('cartId')) || 0;
  hasExpiredCourses: any = false;
  isEmptyPackage: boolean = false;

  accreditedPartners:any;
  sponsorship:any;
  packageContact:any;

  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private _commannService: CommonService,
    private metaService: MetatagsService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.slug = this.activatedRoute.snapshot.params['slug']

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
  }

  ngOnInit(): void {
    this.getPackageGql(this.slug)
    this.getPackagePage()
  }

  // GETTING PACKAGE PAGE //

  getPackagePage() {
    this.courseService.packageDetailPage().subscribe((res: any) => {
      this.accreditedPartners = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.accredited-partners')[0];
      this.sponsorship = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.sponsorship')[0];
      this.packageContact = res?.data[0]?.attributes?.blocks.filter((res: { __component: string; }) => res.__component === 'blocks.package-contact')[0];
    })
  }

  getPackageGql(slug: string) {
    let ids: any = [];
    this.courseService.getPackageDetailbByGql(slug).subscribe((res: any) => {
      if (res?.data?.packages?.data[0]) {
        this.packageData = res.data.packages.data[0].attributes;
        if (this.packageData) {
          const seoObj: Partial<SeoTags> = {
            metaTitle: this.packageData.title,
            metaImage: this.packageData.image,
            metaDescription: this.packageData.title,
            metaSocial: [
              {
                socialNetwork: "Facebook",
                title: this.packageData.title,
                description: this.packageData.title
              },
              {
                socialNetwork: "Twitter",
                title: this.packageData.title,
                description: this.packageData.title
              }
            ]
          }

          if (this.packageData.keywords) {
            seoObj.keywords = this.packageData.keywords
          }

          this.metaService.addSEOTags(seoObj as any);
        } else {
          this.metaService.clearSEOTags();
        }

        console.log(this.packageData);
        

        let name = ''
        this.packageData?.courses?.data.forEach((element: any) => {
          const facultyname = this.getInstructorName(element?.attributes?.instructors)
          this.PackageCourses.push({
            'title': element?.attributes.title,
            'id': element?.id,
            'price': element?.attributes.price,
            'startDate': element?.attributes.startDate,
            'image': element?.attributes.image,
            'slug': element?.attributes.slug,
            'instructor': facultyname,
            'category': element.attributes.category.data.attributes.title,
          });
        });
        this.packageOutline = this.packageData?.outline
        this.faq = this.packageData?.faqs?.faq[0]?.answer
        this.packageId = res?.data?.packages?.data[0]?.id
      }

      this.getTotalPrice()
      this.priceGetter()
      this.packageExpirationCheck()
      this.emptyPackageCheck()
    })
  }


  getInstructorName(instructors: any) {
    const name: string[] = []
    instructors.data.forEach((element: any, index: number) => {
      name.push(element?.attributes?.firstName + ' ' + element?.attributes.lastName)
    })

    return name.join(',');
  }


  // CALCULATING THE PRICE OF PACKAGE ON THE BASIS OF COURSE PRICE//

  getTotalPrice() {
    // this.totalCoursePrice
    this.packageData?.courses?.data?.forEach((element: any) => {
      this.courseCount = this.courseCount + 1
      const price = Number(element?.attributes?.discount) > 0 ? Number(element?.attributes?.discount) : element?.attributes?.price
      this.totalCoursePrice = this.totalCoursePrice + price
    });
    return this.totalCoursePrice
  }

  // checking expired courses in package
  packageExpirationCheck() {

    const filteredArray = this.packageData?.courses?.data.filter((element: any) => {
      const endDate = new Date(element.attributes.endDate).getTime()
      const currDate = Date.now()

      return (element.attributes?.category?.data?.attributes?.title).toLowerCase() == 'live' && endDate < currDate
    })

    if (filteredArray.length > 0) {
      this.hasExpiredCourses = true;
    }

  }

  emptyPackageCheck() {
    if (this.courseCount == 0)
      this.isEmptyPackage = true;
  }

  faqTabCalled() {

    this.showCourseIncluded = false
  }
  outlineTabCalled() {
    this.showCourseIncluded = true
  }

  /* actual price getter */

  priceGetter() {
    if (this.packageData.price != null && this.packageData.price != undefined && this.packageData.price >= 0) {
      this.actualPrice = this.packageData.price
    }
    else {
      this.actualPrice = this.totalCoursePrice
    }
  }

}
