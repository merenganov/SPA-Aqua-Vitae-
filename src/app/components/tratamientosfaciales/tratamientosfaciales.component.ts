import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-tratamientosfaciales',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FaqComponent],
  templateUrl: './tratamientosfaciales.component.html',
  styleUrls: ['./tratamientosfaciales.component.css'],
})
export class TratamientosfacialesComponent {
  tratamientos = [
    {
      nombre: 'Limpieza Facial Profunda',
      descripcion: 'Para eliminar impurezas y mejorar la apariencia de la piel.',
      imagen: 'images/tf1.jpg',
      precio: 400,
    },
    {
      nombre: 'Mascarillas hidratantes y nutritivas',
      descripcion: 'Ayudan a rejuvenecer la piel y mantenerla suave y saludable.',
      imagen: 'images/tf2.jpg',
      precio: 500,
    },
    {
      nombre: 'Peeling quimico',
      descripcion: 'Exfoliación de la piel para mejorar su textura y tono.',
      imagen: 'images/tf3.jpg',
      precio: 600,
    },
    {
      nombre: 'Rejuvenecimiento Facial',
      descripcion: 'Tratamiento para reducir arrugas y líneas de expresión.',
      imagen: 'images/tf4.jpg',
      precio: 600,
    }
  ];

  formulario: FormGroup;
  tratamientoSeleccionado: any = null;
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

  abrirFormulario(tratamiento: any) {
    this.tratamientoSeleccionado = tratamiento;
    this.actualizarTotal();
  }

  actualizarTotal() {
    if (this.tratamientoSeleccionado) {
      const personas = this.formulario.get('personas')?.value || 1;
      this.total = this.tratamientoSeleccionado.precio * personas;
    }
  }

  reservar() {
    if (this.formulario.invalid) {
      Swal.fire('Error', 'Por favor, llena todos los campos correctamente.', 'error');
      return;
    }

    if (!this.tratamientoSeleccionado) {
      Swal.fire('Error', 'Selecciona un tratamiento antes de reservar.', 'error');
      return;
    }

    const reserva = {
      nombre: this.formulario.get('nombre')?.value,
      telefono: this.formulario.get('telefono')?.value,
      correo: this.formulario.get('correo')?.value,
      personas: this.formulario.get('personas')?.value,
      fecha: this.formulario.get('fecha')?.value,
      tratamiento: this.tratamientoSeleccionado.nombre,
      total: this.total,
      timestamp: new Date().toLocaleString()
    };

    // Guardar la reserva en LocalStorage
    const reservasPrevias = JSON.parse(localStorage.getItem('reservas-faciales') || '[]');
    reservasPrevias.push(reserva);
    localStorage.setItem('reservas-faciales', JSON.stringify(reservasPrevias));
    

    Swal.fire('Reserva Exitosa', `Tu total fue de $${this.total} MXN`, 'success');

    // Limpiar el formulario y los datos
    this.formulario.reset();
    this.formulario.get('personas')?.setValue(1); // Reiniciar a 1 persona
    this.tratamientoSeleccionado = null;
    this.total = 0;
  }
}
