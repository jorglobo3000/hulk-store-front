import { Component, OnInit } from '@angular/core';

import { PersonaService } from '../../servicio/persona.service';
import { Persona } from '../../modelo/persona';
import { Md5 } from 'md5-typescript';
import { DataServicio } from '../../servicio/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username: string = null;
  password: string = null;
  error: string = null;

  ocultar: boolean = true;
  constructor(private personaservicio: PersonaService, private dataServicio: DataServicio,
    private router: Router) { }

  ngOnInit(): void {
    console.log(Md5.init('administrador'));
  }

  submit() {
    if (this.username != null && this.password != null) {
      let persona = new Persona();

      persona.username = this.username;
      persona.password = Md5.init(this.password);
      this.password=null;
      this.username=null;
      this.personaservicio.getLogin(persona).subscribe(
        (per) => {
          this.dataServicio.usuario = new Persona();
          this.dataServicio.usuario = per;
          console.log("LOGIN ");
          console.log(per);
          if (this.dataServicio.ruta == null) {
            this.router.navigate(['']);
          }
          else {
            this.router.navigate([this.dataServicio.ruta]);
          }

        });

      console.log("aqui busca en la base el usuario y lo pasa al servicio data");
      console.log(this.dataServicio.usuario);
    }
    else {
      this.error = "Los campos deben ser llenados";
    }
  }

}
