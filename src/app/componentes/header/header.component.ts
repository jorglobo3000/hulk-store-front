import { Component, OnInit } from '@angular/core';
import { DataServicio } from '../../servicio/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  titulo: string = "Kulk Store";
  usuario: string = 'Invitado';
  administrador: boolean = false;
  accionLogin: string = 'Iniciar sesión';
  accionLogout: string = 'Salir';
  constructor(private dataServicio: DataServicio) {
  }

  ngOnInit(): void {
    if (this.dataServicio.usuario == null || typeof this.dataServicio.usuario === 'undefined') {
      this.usuario = 'Invitado';
    } else {
      this.usuario = this.dataServicio.usuario.nombre;
    }

  }

  logout(){
    this.dataServicio.usuario=null;
    this.usuario='Invitado';
  }

}
