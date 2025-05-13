import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: string = '';
  esOswaldo: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {

    this.usuario = this.authService.getUsuario();
     // Verifica si el usuario es Oswaldo De La Cruz García
     // y actualiza la variable esOswaldo
    this.esOswaldo = this.usuario === 'Oswaldo De La Cruz García';
    
    this.authService.usuario$.subscribe(nombre => {
      this.usuario = nombre;
      this.esOswaldo = nombre === 'Oswaldo De La Cruz García';
    });
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.usuario = '';
    this.esOswaldo = false;
    this.router.navigate(['/login']);
  }
}
