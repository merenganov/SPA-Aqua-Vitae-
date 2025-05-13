import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Importado correctamente

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([])),
    provideRouter(routes),
    importProvidersFrom(FormsModule) // ✅ Añadido correctamente
  ]
}).catch(err => console.error(err));
