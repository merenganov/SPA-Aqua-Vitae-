import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-sauna',
  imports: [CommonModule, FormsModule, FaqComponent],
  templateUrl: './sauna.component.html',
  styleUrls: ['./sauna.component.css'],
})
export class SaunaComponent {
  minDate: string = '';
  fecha: string = '';

  constructor() {
    // Obtenemos la fecha actual
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Mes en dos dígitos
    const day = today.getDate().toString().padStart(2, '0'); // Día en dos dígitos
    this.minDate = `${year}-${month}-${day}`;
  }
  // Arreglo de servicios (Lista desplegable)
  servicios = [
    { 
      nombre: 'Baño de Vapor', 
      descripcion: 'Utilizan el calor y la humedad para ayudar a desintoxicar el cuerpo, mejorar la circulación y relajarse.', 
      precio: 400, 
      imagen: 'images/sauna1.jpg' 
    },
    { 
      nombre: 'Sauna Finlandesa', 
      descripcion: 'Calor seco para desintoxicar el cuerpo.', 
      precio: 500, 
      imagen: 'images/sauna2.jpeg' 
    },
    { 
      nombre: 'Sauna ', 
      descripcion: 'Un ambiente seco de calor que ayuda a eliminar toxinas a través del sudor, mejora la circulación y relaja los músculos.', 
      precio: 600, 
      imagen: 'images/sauna3.jpg' 
    }
  ];

  // Opciones adicionales (Checkboxes)
  opcionesAdicionales = [
    { nombre: 'Aromaterapia', precio: 100, seleccionado: false },
    { nombre: 'Exfoliación Corporal', precio: 100, seleccionado: false },
    { nombre: 'Masaje Relajante', precio: 100, seleccionado: false }
  ];

  // Variables del formulario
  servicioSeleccionado: any = null;
  total: number = 0;
  nombre: string = '';
  telefono: string = '';
  correo: string = '';
  tipoSeleccionado: string = '';

  // Método para calcular el total
  calcularTotal() {
    if (this.servicioSeleccionado) {
      const adicionales = this.opcionesAdicionales
        .filter(opcion => opcion.seleccionado)
        .reduce((sum, opcion) => sum + opcion.precio, 0);
      
      this.total = this.servicioSeleccionado.precio + adicionales;
    }
  }

  // Método para reservar y almacenar en LocalStorage
  reservar() {
    if (this.nombre && this.telefono && this.correo && this.fecha && this.servicioSeleccionado) {
      const reserva = {
        nombre: this.nombre,
        telefono: this.telefono,
        correo: this.correo,
        fecha: this.fecha,
        servicio: this.servicioSeleccionado.nombre,
        adicionales: this.opcionesAdicionales.filter(opcion => opcion.seleccionado),
        tipo: this.tipoSeleccionado,
        total: this.total,
      };

      // Guardar en LocalStorage
      const reservasPrevias = JSON.parse(localStorage.getItem('reservasSauna') || '[]');
      reservasPrevias.push(reserva);
      localStorage.setItem('reservasSauna', JSON.stringify(reservasPrevias));

      // SweetAlert de éxito
      Swal.fire('Reserva Exitosa', `Tu total fue de $${this.total} MXN`, 'success');

      // Limpiar formulario
      this.nombre = '';
      this.telefono = '';
      this.correo = '';
      this.fecha = '';
      this.tipoSeleccionado = '';
      this.servicioSeleccionado = null;
      this.total = 0;
      this.opcionesAdicionales.forEach(opcion => opcion.seleccionado = false);
    } else {
      // SweetAlert de error
      Swal.fire('Error', 'Por favor, llena todos los campos antes de reservar.', 'error');
    }
  }
}
