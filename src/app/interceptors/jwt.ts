import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export default function jwtInterceptor(request: HttpRequest<any>,
    next: HttpHandlerFn,
): Observable<HttpEvent<any>> {
 
    // const url = request.url.split('/')
    // const isLoggedIn = localStorage.getItem('login');
    // const isRegistered = localStorage.getItem('register');
    // const tokenStatic = environment.rotoken;

    // const token = localStorage.getItem('token');
    // const isApiUrl = request.url.startsWith(environment.apibaseurl);    

    // if ((url[5] && url[4] !== 'instructors' && url[5] !== 'custom-forgot-password' && url[4] !== 'user-card-tokens' && url[2] !== 'cors-anywhere.herokuapp.com') ||
    //     url[4] == 'profile' || url[4] == 'change-password'
    //     || url[4] == 'carts' || url[4] == 'validateCoupon' || url[4] == 'logs' || url[4] == 'orders' || url[4] == 'checkout' || url[4] == 'user-exams' || url[4] == "orderUpdate") {
    //     if (isLoggedIn === 'true') {
            
    //         if (token) {
    //             request = request.clone({
    //                 setHeaders: {
                       
    //                 },
    //             });
    //         }
    //     }
    //     if (url[4] === 'course' || url[4] === 'packages') {
    //         request = request.clone({
    //             setHeaders: {
    //                 Authorization: `Bearer ${tokenStatic}`,
    //             },
    //         });
    //     }
    // }
    // else if (url[5] && url[5] === 'custom-forgot-password' || url[5] === 'homepage' || url[2] === 'cors-anywhere.herokuapp.com' || url[4] === 'contact-uses') {
    //     request = request.clone({
    //         setHeaders: {
    //             // Authorization: `Bearer ${tokenStatic}`,
    //         },
    //     });
    // }

    // else {

    //     request = request.clone({
    //         setHeaders: {
    //             // Authorization: `Bearer ${tokenStatic}`,
    //         },
    //     });
    // }

    return next(request);
}  