import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  titulo: string = "Kulk Store";
  usuario: string = 'Invitado';
  sesionActiva: boolean = false;
  accionLogin: string = 'Iniciar sesión';
  accionLogout: string = 'Salir';
  constructor() {
  }

  ngOnInit(): void {
    if (this.usuario != 'Invitado') {
      this.sesionActiva = true;
    }
  }

}
