import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-tratamientoscorporales',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FaqComponent],
  templateUrl: './tratamientoscorporales.component.html',
  styleUrls: ['./tratamientoscorporales.component.css'],
})
export class TratamientoscorporalesComponent {
  tratamientos = [
    {
      nombre: 'Exfoliación Corporal',
      descripcion: 'Elimina células muertas y deja la piel suave.',
      imagen: 'images/tc1.jpg',
      precio: 500,
    },
    {
      nombre: 'Envolturas Corporales',
      descripcion: 'Nutrientes para la piel y mejora de firmeza.',
      imagen: 'images/tc2.jpg',
      precio: 300,
    },
    {
      nombre: 'Masaje con aceites esenciales',
      descripcion: 'Relajación profunda con aceites esenciales.',
      imagen: 'images/tc3.jpg',
      precio: 600,
    },
    {
      nombre: 'Terapia de Piedras Calientes',
      descripcion: 'Equilibrio y relajación con piedras calientes.',
      imagen: 'images/tc4.webp',
      precio: 700,
    },
    {
      nombre: 'Drenaje Linfático',
      descripcion: 'Masaje suave y rítmico que estimula el sistema linfático para eliminar toxinas y reducir la inflamación.',
      imagen: 'images/tc5.jpg',
      precio: 500,
    },
    {
      nombre: 'Tratamiento Reafirmante',
      descripcion: 'Tratamiento que ayuda a reducir la flacidez y mejora la elasticidad de la piel.',
      imagen: 'images/tc6.jpg',
      precio: 600,
    },
    {
      nombre: 'Envoltura de Chocolate',
      descripcion: 'Relaja y nutre la piel con propiedades antioxidantes, mejorando su suavidad y brillo.',
      imagen: 'images/tc7.jpg',
      precio: 650,
    },
    {
      nombre: 'Masaje sueco',
      descripcion: 'Masaje terapéutico enfocado en aliviar tensiones musculares y mejorar la circulación sanguínea.',
      imagen: 'images/tc8.jpg',
      precio: 500,
    }
  ];

  formulario: FormGroup;
  total: number = 0;
  minDate: string = '';

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      fecha: ['', Validators.required],
      personas: [1, [Validators.required, Validators.min(1)]],
      tratamiento: ['', Validators.required]
    });

    this.calcularFechaMinima();
  }

  // Calcular la fecha mínima para el calendario (hoy en adelante)
  calcularFechaMinima() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

  // Actualizar total al cambiar el tratamiento o el número de personas
  actualizarTotal() {
    const personas = this.formulario.get('personas')?.value;
    const tratamiento = this.formulario.get('tratamiento')?.value;

    const seleccionado = this.tratamientos.find(t => t.nombre === tratamiento);

    if (seleccionado) {
      this.total = seleccionado.precio * personas;
    } else {
      this.total = 0;
    }
  }

  // Método para reservar
  reservar() {
    if (this.formulario.invalid) {
      Swal.fire('Error', 'Por favor, completa todos los campos correctamente.', 'error');
      return;
    }

    const reserva = {
      ...this.formulario.value,
      total: this.total
    };

    const reservasPrevias = JSON.parse(localStorage.getItem('reservascorporales') || '[]');
    reservasPrevias.push(reserva);
    localStorage.setItem('reservascorporales', JSON.stringify(reservasPrevias));

    Swal.fire('Reserva Exitosa', `Tu total fue de $${this.total} MXN`, 'success');
    this.formulario.reset();
    this.total = 0;
  }
}
