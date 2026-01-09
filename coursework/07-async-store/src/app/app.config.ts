import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { DICTIONARIES_TOKEN } from './tokens/dictionaries.token';
import { DICTIONARIES } from './data/dictionaries';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    { provide: DICTIONARIES_TOKEN, useValue: DICTIONARIES }
  ]
};
