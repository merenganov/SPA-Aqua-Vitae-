import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  servicios = [
    {
      nombre: 'Relajacion en spa',
      imagen: 'images/galeria1.jpg'
    },
    {
      nombre: 'Masaje revitalizante',
      imagen: 'images/galeria2.jpg'
    },
    {
      nombre: 'Tratamientos de belleza',
      imagen: 'images/galeria3.jpg'
    },
    {
      nombre: 'Ambiente de serenidad',
      imagen: 'images/galeria4.jpg'
    },
    {
      nombre: 'Experiencia de lujo',
      imagen: 'images/galeria5.jpg'
    },
    {
      nombre: 'Bienestar total',
      imagen: 'images/galeria6.jpg'
    }
  ];
}
