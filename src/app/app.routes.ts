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

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
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
        path: 'package',
        component: PackageComponent
    },
    {
        path: 'course-enrollement',
        component: CourseEnrollementComponent
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
    }
];
