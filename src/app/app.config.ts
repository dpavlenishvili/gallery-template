import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { IMAGE_LOADER } from '@angular/common';
import { imageLoader } from './shared/utils/image-loader';
import { latencyInterceptor } from './core/interceptors/latency-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    { provide: IMAGE_LOADER, useValue: imageLoader },
    provideHttpClient(withInterceptors([latencyInterceptor])),
  ],
};
