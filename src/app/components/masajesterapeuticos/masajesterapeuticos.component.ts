import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-masajesterapeuticos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FaqComponent],
  templateUrl: './masajesterapeuticos.component.html',
  styleUrls: ['./masajesterapeuticos.component.css'],
})
export class MasajesterapeuticosComponent {
  masajes = [
    {
      nombre: 'Masaje relajante',
      descripcion: 'Para aliviar el estrés y promover la relajación general.',
      imagen: 'images/mt1.webp',
      precio: 500,
    },
    {
      nombre: 'Masaje de tejido profundo',
      descripcion: 'Para aliviar tensiones musculares y dolores crónicos.',
      imagen: 'images/mt2.jpg',
      precio: 600,
    },
    {
      nombre: 'Masaje con piedras calientes',
      descripcion: 'Utiliza piedras volcánicas calentadas para aliviar la tensión muscular.',
      imagen: 'images/mt3.jpg',
      precio: 700,
    },
    {
      nombre: 'Masaje sueco',
      descripcion: 'Un masaje suave para relajación que se enfoca en la circulación sanguínea.',
      imagen: 'images/mt4.webp',
      precio: 650,
    },
    {
      nombre: 'Masaje deportivo',
      descripcion: 'Para aliviar la tensión muscular en personas activas o deportistas.',
      imagen: 'images/mt5.jpg',
      precio: 800,
    },
    {
      nombre: 'Masaje reflexológico',
      descripcion: 'Se enfoca en puntos específicos de los pies y manos para aliviar el estrés en todo el cuerpo.',
      imagen: 'images/mt6.jpg',
      precio: 750,
    },
    {
      nombre: 'Masaje prenatal',
      descripcion: 'Diseñado para aliviar el dolor y la tensión en mujeres embarazadas.',
      imagen: 'images/mt7.jpg',
      precio: 900,
    },
    {
      nombre: 'Masaje aromaterapia',
      descripcion: 'Combina aceites esenciales con técnicas de masaje para mejorar el bienestar.',
      imagen: 'images/mt8.jpg',
      precio: 850,
    }
    
  ];

  formulario: FormGroup;
  masajeSeleccionado: any = null;
  fechaMinima: string;
  total: number = 0;

  constructor(private fb: FormBuilder) {
    const hoy = new Date();
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const dia = hoy.getDate().toString().padStart(2, '0');
    this.fechaMinima = `${hoy.getFullYear()}-${mes}-${dia}`;

    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      personas: [1, [Validators.required, Validators.min(1)]],
      fecha: ['', Validators.required]
    });

    this.formulario.get('personas')?.valueChanges.subscribe(() => {
      this.actualizarTotal();
    });
  }

  abrirFormulario(masaje: any) {
    this.masajeSeleccionado = masaje;
    this.actualizarTotal();
  }

  actualizarTotal() {
    if (this.masajeSeleccionado) {
      const personas = this.formulario.get('personas')?.value || 1;
      this.total = this.masajeSeleccionado.precio * personas;
    }
  }

  reservar() {
    if (this.formulario.invalid) {
      Swal.fire('Error', 'Por favor, llena todos los campos correctamente.', 'error');
      return;
    }

    if (!this.masajeSeleccionado) {
      Swal.fire('Error', 'Selecciona un masaje antes de reservar.', 'error');
      return;
    }

    const reservamasajes = {
      nombre: this.formulario.get('nombre')?.value,
      telefono: this.formulario.get('telefono')?.value,
      correo: this.formulario.get('correo')?.value,
      personas: this.formulario.get('personas')?.value,
      fecha: this.formulario.get('fecha')?.value,
      tratamiento: this.masajeSeleccionado.nombre,
      total: this.total,
      timestamp: new Date().toLocaleString()
    };

    // Guardar la reserva en LocalStorage
    const reservasPrevias = JSON.parse(localStorage.getItem('reservas-masajes') || '[]');
    reservasPrevias.push(reservamasajes);
    localStorage.setItem('reservas-masajes', JSON.stringify(reservasPrevias));

    Swal.fire('Reserva Exitosa', `Tu total fue de $${this.total} MXN`, 'success');

    // Limpiar el formulario y los datos
    this.formulario.reset();
    this.formulario.get('personas')?.setValue(1); // Reiniciar a 1 persona
    this.masajeSeleccionado = null;
    this.total = 0;
  }
}
