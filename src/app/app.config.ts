import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';

export const appConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(RouterModule)
  ]
};
export const appConfigProviders = [
  ...appConfig.providers
];