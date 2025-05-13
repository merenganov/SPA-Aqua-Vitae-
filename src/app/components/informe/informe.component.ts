import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-informe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css'],
})
export class InformeComponent {
  categorias = [
    { nombre: 'Masajes Terapéuticos', clave: 'reservas-masajes' },
    { nombre: 'Sauna', clave: 'reservasSauna' },
    { nombre: 'Tratamientos Corporales', clave: 'reservascorporales' },
    { nombre: 'Tratamientos Faciales', clave: 'reservas-faciales' },
    { nombre: 'Aromaterapia', clave: 'reservasaromaterapias' },
    { nombre: 'Promociones', clave: 'reservacionpromo' },
  ];

  reservas: any = {};
  editando: any = null;

  constructor() {
    this.cargarReservas();
  }


  cargarReservas() {
    this.categorias.forEach(categoria => {
      const datos = JSON.parse(localStorage.getItem(categoria.clave) || '[]');
      this.reservas[categoria.clave] = datos;
    });

  }

  eliminarReserva(clave: string, index: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.reservas[clave]) {
          this.reservas[clave].splice(index, 1);
          localStorage.setItem(clave, JSON.stringify(this.reservas[clave]));
          Swal.fire('Eliminado', 'La reservación ha sido eliminada.', 'success');
        } else {
          Swal.fire('Error', 'No se encontró el registro en LocalStorage.', 'error');
        }
      }
    });
  }

  editarReserva(clave: string, index: number) {
    this.editando = { ...this.reservas[clave][index], index, clave };
  }

  guardarEdicion() {
    if (this.editando) {
      const { clave, index } = this.editando;
      this.reservas[clave][index] = this.editando;
      localStorage.setItem(clave, JSON.stringify(this.reservas[clave]));
      this.editando = null;
      Swal.fire('Actualizado', 'La reservación ha sido actualizada.', 'success');
    }
  }

  cancelarEdicion() {
    this.editando = null;
  }
}
