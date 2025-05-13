import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-aromaterapia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FaqComponent],
  templateUrl: './aromaterapia.component.html',
  styleUrls: ['./aromaterapia.component.css'],
})
export class AromaterapiaComponent {
  tratamientos = [
    {
      nombre: 'Relajación Profunda',
      descripcion: 'Aromaterapia con esencias relajantes para equilibrar cuerpo y mente.',
      imagen: 'images/aro1.jpg',
      precio: 400,
    },
    {
      nombre: 'Energía Vital',
      descripcion: 'Aceites energizantes para revitalizar el cuerpo y el espíritu.',
      imagen: 'images/aro2.jpg',
      precio: 450,
    },
    {
      nombre: 'Desintoxicación Aromática',
      descripcion: 'Mezcla de esencias que ayudan a eliminar toxinas y purificar el cuerpo.',
      imagen: 'images/aro3.jpg',
      precio: 500,
    },
    {
      nombre: 'Equilibrio Emocional',
      descripcion: 'Aromaterapia para equilibrar emociones y promover la paz interior.',
      imagen: 'images/aro4.webp',
      precio: 550,
    },
    {
      nombre: 'Sueño Reparador',
      descripcion: 'Aceites esenciales que favorecen un sueño profundo y reparador.',
      imagen: 'images/aro5.jpg',
      precio: 600,
    },
    {
      nombre: 'Aromaterapia para la Piel',
      descripcion: 'Tratamiento aromático para mejorar la salud y apariencia de la piel.',
      imagen: 'images/aro6.jpg',
      precio: 650,
    },
    {
      nombre: 'Aromaterapia para el Estrés',
      descripcion: 'Técnicas de aromaterapia para reducir el estrés y la ansiedad.',
      imagen: 'images/aro7.webp',
      precio: 700,
    },
    {
      nombre: 'Aromaterapia para la Concentración',
      descripcion: 'Aceites esenciales que mejoran la concentración y la memoria.',
      imagen: 'images/aro8.jpg',
      precio: 750,
    },
    
  ];

  formulario: FormGroup;
  tratamientoSeleccionado: any = null;
  total: number = 0;
  fechaMinima: string = '';

  constructor(private fb: FormBuilder) {
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().split('T')[0];

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      correo: ['', [Validators.required, Validators.email]],
      personas: [1, [Validators.required, Validators.min(1)]],
      fecha: ['', Validators.required],
    });
  }

  abrirFormulario(tratamiento: any) {
    this.tratamientoSeleccionado = tratamiento;
    this.total = tratamiento.precio * this.formulario.get('personas')?.value;
  }

  actualizarTotal() {
    if (this.tratamientoSeleccionado) {
      this.total = this.tratamientoSeleccionado.precio * this.formulario.get('personas')?.value;
    }
  }

  reservar() {
    if (this.formulario.invalid || !this.tratamientoSeleccionado) {
      Swal.fire('Error', 'Por favor, llena todos los campos correctamente', 'error');
      return;
    }

    const reservaaromaterapia = {
      ...this.formulario.value,
      tratamiento: this.tratamientoSeleccionado.nombre,
      total: this.total,
    };

    const reservasPrevias = JSON.parse(localStorage.getItem('reservasaromaterapias') || '[]');
    reservasPrevias.push(reservaaromaterapia);
    localStorage.setItem('reservasaromaterapias', JSON.stringify(reservasPrevias));

    Swal.fire('Reserva Exitosa', `Tu total fue de $${this.total} MXN`, 'success');

    this.formulario.reset();
    this.formulario.get('personas')?.setValue(1);
    this.tratamientoSeleccionado = null;
    this.total = 0;
  }
}
