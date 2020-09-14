import { Component, OnInit } from '@angular/core';
import { DataServicio } from '../../servicio/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  usuario: string = 'Invitado';
  administrador: boolean = false;
  accionLogin: string = 'Iniciar sesión';
  accionLogout: string = 'Salir';
  constructor(private dataServicio: DataServicio) { }

  ngOnInit(): void {
    if (this.dataServicio.usuario == null || typeof this.dataServicio.usuario === 'undefined') {
      this.usuario = 'Invitado';
    } else {
      this.usuario = this.dataServicio.usuario.nombre;
      this.administrador=this.dataServicio.usuario.tipoPersona=='ADM';
    }
  }

  logout() {
    this.dataServicio.usuario = null;
    this.dataServicio.ruta="/productos";
    this.usuario = 'Invitado';
    this.administrador=false;
  }
}
