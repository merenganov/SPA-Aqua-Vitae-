import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  nombre: string = '';
  newUsername: string = '';
  newPassword: string = '';

  usuarios = [
    { username: 'admin', password: 'admin123', nombre: 'Oswaldo De La Cruz García' },
    { username: 'user1', password: 'user123', nombre: 'Martha Melinna Flores Hernández' },
    { username: 'user2', password: 'user456', nombre: 'Joshua Davila Rodríguez' }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    const user = this.usuarios.find(u => u.username === this.username && u.password === this.password);

    if (user) {
      this.authService.setUsuario(user.nombre);
      if (user.nombre === 'Oswaldo De La Cruz García') {
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: `Hola, ${user.nombre}`,
          showCancelButton: true,
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/informe']);
          }
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: `Hola, ${user.nombre}`,
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/carousel']);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos.',
        showConfirmButton: true
      });
    }
  }

  // Nueva función para el registro
  register() {
    if (this.newUsername && this.newPassword) {
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: `El usuario ${this.newUsername} se ha registrado correctamente.`,
        showConfirmButton: true
      });

      // Limpiar campos
      this.nombre = '';
      this.newUsername = '';
      this.newPassword = '';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios.',
        showConfirmButton: true
      });
    }
  }
}
