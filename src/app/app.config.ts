import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpHeaders, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment';
import jwtInterceptor from './interceptors/jwt';

const uri = environment.apibaseurl + '/graphql';

const token = localStorage.getItem('token');

console.log(token);


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
    provideApollo(() => {
    
    const httpLink = inject(HttpLink);

    return {
      link: httpLink.create({
        uri,
        headers: new HttpHeaders({
          "Authorization": `Bearer ${token}`,
        })
      }),
      cache: new InMemoryCache(),
    };
  })]
};
