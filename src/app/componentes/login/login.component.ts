import { Component, OnInit } from '@angular/core';

import { PersonaService } from '../../servicio/persona.service';
import { Persona } from '../../modelo/persona';
import { Md5 } from 'md5-typescript';
import { DataServicio } from '../../servicio/data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username: string = null;
  password: string = null;
  error: string = null;
  persona: Persona = new Persona();
  verRegistrar: boolean = false;

  ocultar: boolean = true;
  constructor(private personaservicio: PersonaService, private dataServicio: DataServicio,
    private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  submit() {
    if (this.username != null && this.password != null) {
      let persona = new Persona();

      persona.username = this.username;
      persona.password = Md5.init(this.password);
      this.password = null;
      this.username = null;
      this.personaservicio.getLogin(persona).subscribe(
        (per) => {
          this.dataServicio.usuario = new Persona();
          this.dataServicio.usuario = per;
          if (this.dataServicio.ruta == null) {
            this.router.navigate(['/']);
          }
          else {
            this.router.navigate([this.dataServicio.ruta]);
          }

        });
    }
    else {
      this.error = "Los campos deben ser llenados";
    }
  }

  iniciarRegistro() {
    this.verRegistrar = true;
  }

  registrar() {
    this.persona.estado = 'ACT';
    this.persona.tipoPersona = 'CLI';
    this.persona.password = Md5.init(this.password);
    this.personaservicio.registrarse(this.persona).subscribe(
      (persona) => {
        this.persona = persona;
        this.dataServicio.usuario = persona;
        this.openSnackBar("Registro exitoso", "");
        if (this.dataServicio.ruta == null) {
          this.router.navigate(['/']);
        }
        else {
          this.router.navigate([this.dataServicio.ruta]);
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
