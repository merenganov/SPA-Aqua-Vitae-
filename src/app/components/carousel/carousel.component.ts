import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CardsComponent } from '../cards/cards.component';
import { GaleriaComponent } from '../galeria/galeria.component';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-carousel',
  imports: [CardsComponent, GaleriaComponent, FaqComponent],  
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  reservar() {
    Swal.fire({
      title: '¡Reserva Exitosa!',
      html: `
        <div style="font-size: 1.1em; margin-bottom: 10px;">
          Gracias por elegir <b>Aqua Vitae Spa</b>.
          <br>Pronto nos pondremos en contacto contigo.
        </div>
        <img src="images/aqua4.webp" alt="Reserva Confirmada" style="width: 100%; border-radius: 8px; margin-top: 10px;">
      `,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#009688',
      background: '#e6f7ff',
      color: '#333',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }
}
