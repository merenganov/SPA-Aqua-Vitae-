import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-galeria',
  imports: [CommonModule],
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {
  imagenSeleccionada: string = 'images/g1.jpg';
  mostrarModal: boolean = false;

  imagenes = [
    { url: 'images/g1.jpg' },
    { url: 'images/g2.webp' },
    { url: 'images/g3.jpg' },
    { url: 'images/g4.webp' },
    { url: 'images/g5.webp' }
  ];

  seleccionarImagen(url: string) {
    this.imagenSeleccionada = url;
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}
