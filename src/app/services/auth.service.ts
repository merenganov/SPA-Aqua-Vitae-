import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public usuario$: Observable<string> = this.usuarioActual.asObservable();

  constructor() {}

  // Método para actualizar el usuario logueado
  setUsuario(nombre: string) {
    this.usuarioActual.next(nombre);
  }

  // Método para obtener el usuario actual
  getUsuario(): string {
    return this.usuarioActual.value;
  }

  // Método para cerrar sesión
  cerrarSesion() {
    this.usuarioActual.next('');
  }
}
