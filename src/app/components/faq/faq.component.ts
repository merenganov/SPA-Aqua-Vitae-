import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  preguntas = [
    { pregunta: '¿Cuáles son los horarios del Spa?', respuesta: 'Nuestro Spa está abierto de 9:00 AM a 8:00 PM de lunes a sábado.' },
    { pregunta: '¿Necesito una cita para recibir un masaje?', respuesta: 'Recomendamos agendar una cita con anticipación para asegurar disponibilidad.' },
    { pregunta: '¿Ofrecen promociones para grupos?', respuesta: 'Sí, contamos con promociones especiales para grupos mayores a 5 personas.' },
    { pregunta: '¿Los tratamientos incluyen acceso a las instalaciones?', respuesta: 'Sí, todos nuestros tratamientos incluyen acceso a las instalaciones del Spa.' }
  ];
  seleccionada: number | null = null;

  toggle(index: number) {
    this.seleccionada = this.seleccionada === index ? null : index;
  }
}
