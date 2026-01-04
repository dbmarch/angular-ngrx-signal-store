import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { QuizStore } from './store/quiz.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
  ]
};
