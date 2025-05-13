import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl, SafeHtml } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { SafeHtmlPipe } from '../../safe-html.pipe';

@Component({
  selector: 'app-referencias',
  imports: [CommonModule, FormsModule, SafeHtmlPipe],
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css'],
})
export class ReferenciasComponent {
  referencias: any[] = [];
  nombre: string = '';
  enlace: string = '';
  descripcion: string = '';
  fecha: string = '';

  constructor(private sanitizer: DomSanitizer) {
    this.cargarReferencias();
  }

  // Método para cargar las referencias del LocalStorage
  cargarReferencias() {
    const data = localStorage.getItem('referencias');
    this.referencias = data ? JSON.parse(data) : [];
  }

  // Método para agregar una nueva referencia
  agregarReferencia() {
    if (this.nombre === '' || this.enlace === '' || this.descripcion === '' || this.fecha === '') {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    const referencia = {
      nombre: this.nombre,
      enlace: this.sanitizer.bypassSecurityTrustResourceUrl(this.enlace),
      descripcion: this.sanitizer.bypassSecurityTrustHtml(this.descripcion),
      fecha: new Date(this.fecha),
    };

    this.referencias.push(referencia);
    localStorage.setItem('referencias', JSON.stringify(this.referencias));

    Swal.fire('Referencia Agregada', 'La referencia se guardó correctamente', 'success');

    // Limpiar formulario
    this.nombre = '';
    this.enlace = '';
    this.descripcion = '';
    this.fecha = '';
  }

  // Método para eliminar referencia
  eliminarReferencia(index: number) {
    this.referencias.splice(index, 1);
    localStorage.setItem('referencias', JSON.stringify(this.referencias));
    Swal.fire('Eliminada', 'La referencia ha sido eliminada', 'success');
  }
}
