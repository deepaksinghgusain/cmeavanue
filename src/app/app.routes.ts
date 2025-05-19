import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PackageComponent } from './pages/package/package.component';
import { CourseEnrollementComponent } from './pages/course-enrollement/course-enrollement.component';
import { TestimonialComponent } from './pages/testimonial/testimonial.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { SelfStudyComponent } from './pages/self-study/self-study.component';
import { CourseCatalogComponent } from './pages/course-catalog/course-catalog.component';
import { BundleandsubscriptionComponent } from './pages/bundleandsubscription/bundleandsubscription.component';
import { EBookComponent } from './pages/e-book/e-book.component';
import { CartComponent } from './pages/cart/cart.component';
import { DashboardComponent } from './pages/learner/dashboard/dashboard.component';
import { InstructorListingComponent } from './pages/instructor/instructor-listing/instructor-listing.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about-us',
        component: AboutComponent
    },
    {
        path: 'contact-us',
        component: ContactComponent
    }, 
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: SignupComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'package/:slug',
        component: PackageComponent
    },
    {
        path: 'testimonial',
        component: TestimonialComponent
    },
    {
        path: 'faqs',
        component: FaqsComponent
    },
    {
        path: 'self-study',
        component: SelfStudyComponent
    },
    {
        path: 'course-catalog',
        component: CourseCatalogComponent
    },
    {
        path: 'bundle-and-subscription',
        component: BundleandsubscriptionComponent   
    },
    {
        path: 'e-book',
        component: EBookComponent
    },
    {
        path: 'course/:slug',
        component: CourseEnrollementComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'instructor/instructor-listing',
        component: InstructorListingComponent
    },
    {
        path: 'learner/dashboard',
        component: DashboardComponent
    }
];
