import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';
import { setContext } from '@apollo/client/link/context';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment';
import jwtInterceptor from './interceptors/jwt';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';


const uri = environment.apibaseurl + '/graphql';

const token = localStorage.getItem('token');


const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

const authLink = setContext((_, { headers }: { headers?: Record<string, string> }) => {
  // get the authentication token from local storage if it exists
  const token: string | null = localStorage.getItem('token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, inMemoryScrollingFeature),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    provideApollo(() => {

      const httpLink = inject(HttpLink);

      const httpLinkUri = httpLink.create({
        uri
      });

      return {
        link: authLink.concat(httpLinkUri),
        cache: new InMemoryCache(),
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'no-cache',
          },
          query: {
            fetchPolicy: 'network-only',
          },
        },
      };
    })]
};
