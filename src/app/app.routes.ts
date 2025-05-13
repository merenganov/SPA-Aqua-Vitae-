import { Routes } from '@angular/router';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoginComponent } from './components/login/login.component';
import { SaunaComponent } from './components/sauna/sauna.component';
import { AromaterapiaComponent } from './components/aromaterapia/aromaterapia.component';
import { MasajesterapeuticosComponent } from './components/masajesterapeuticos/masajesterapeuticos.component';
import { TratamientoscorporalesComponent } from './components/tratamientoscorporales/tratamientoscorporales.component';
import { TratamientosfacialesComponent } from './components/tratamientosfaciales/tratamientosfaciales.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { ProductosComponent } from './components/productos/productos.component';
import { InformeComponent } from './components/informe/informe.component';
import { ReferenciasComponent } from './components/referencias/referencias.component';

export const routes: Routes = [
  {path: '', redirectTo:'/carousel', pathMatch: 'full'},
  { path: 'carousel', component: CarouselComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent},
  { path: 'sauna', component : SaunaComponent },
  { path: 'aromaterapia', component: AromaterapiaComponent},
  { path: 'masajesterapeuticos', component: MasajesterapeuticosComponent},
  { path: 'tratamientoscorporales', component: TratamientoscorporalesComponent},
  { path: 'tratamientosfaciales', component: TratamientosfacialesComponent},
  { path: 'promociones', component: PromocionesComponent},
  { path : 'productos', component: ProductosComponent},
  { path: 'informe', component: InformeComponent},
  { path: 'referencias', component: ReferenciasComponent}
];

