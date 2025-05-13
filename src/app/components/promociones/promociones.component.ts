import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-promociones',
  imports: [CommonModule, ReactiveFormsModule, FaqComponent],
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent {
  formulario: FormGroup;

  promociones = [
    { titulo: 'Masaje Relajante', descripcion: 'Relájate profundamente', precio: 300 },
    { titulo: 'Facial Hidratante', descripcion: 'Hidrata y cuida tu piel', precio: 250 },
    { titulo: 'Spa Completo', descripcion: 'Un día completo de relajación', precio: 900 },
    { titulo: 'Masaje de Piedras Calientes', descripcion: 'Relaja los músculos y equilibra la energía', precio: 400 },
    { titulo: 'Terapia de Vinoterapia', descripcion: 'Tratamiento rejuvenecedor con extractos de uva', precio: 500 },
    { titulo: 'Reflexología Podal', descripcion: 'Masaje especializado en puntos estratégicos de los pies', precio: 250 },
    { titulo: 'Tratamiento Antiestrés', descripcion: 'Masaje relajante, aromaterapia y música ambiental', precio: 600 },
    { titulo: 'Baño de Flotación', descripcion: 'Experiencia única en un tanque de flotación', precio: 700 },
    { titulo: 'Hidratación Facial Profunda', descripcion: 'Repara y revitaliza la piel del rostro', precio: 350 },
    { titulo: 'Día de Spa para Parejas', descripcion: 'Disfruta con tu pareja de un masaje relajante', precio: 1200 }
  ];

  promocionSeleccionada: any = null;
  total: number = 0;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      correo: ['', [Validators.required, Validators.email]],
      personas: [1, [Validators.required, Validators.min(1)]]
    });
  }

  solicitarPromocion(promocion: any) {
    this.promocionSeleccionada = promocion;
    this.total = promocion.precio;
  }

  enviarSolicitud() {
  if (this.formulario.valid) {
    // Leer lo que ya existe en LocalStorage
    const reservasPrevias = JSON.parse(localStorage.getItem('reservacionpromo') || '[]');

    // Crear el nuevo objeto de reserva
    const reserva = {
      ...this.formulario.value,
      promocion: this.promocionSeleccionada.titulo,
      total: this.total * this.formulario.value.personas
    };

    // Agregar la nueva reserva al arreglo de reservas previas
    reservasPrevias.push(reserva);

    // Guardar el arreglo actualizado en LocalStorage
    localStorage.setItem('reservacionpromo', JSON.stringify(reservasPrevias));

    // Mensaje de confirmación
    Swal.fire({
      icon: 'success',
      title: 'Reservación Exitosa',
      text: `Tu total fue de $${reserva.total} MXN`
    });

    // Limpiar formulario
    this.formulario.reset();
    this.promocionSeleccionada = null;
    this.total = 0;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos del formulario'
    });
  }
}

}
""
