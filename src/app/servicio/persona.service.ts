import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Persona } from '../modelo/persona';
import { Constantes } from '../util/constantes';
import { HttpClient, HttpHeaders } from '@Angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }

  getPersonaPorIdentificacion(identificacion:string):Observable<Persona> {
    return this.http.get<Persona>( Constantes.URL_BASE_API+Constantes.URL_PERSONAS+"listar/"+identificacion);
  }

  getLogin(persona:Persona):Observable<Persona>{
    let headers=new HttpHeaders().set('Content-Type', "application/json");
    return this.http.post<Persona>( Constantes.URL_BASE_API+Constantes.URL_PERSONAS+"login", persona,{headers:headers}).pipe(
      catchError(
        e => {
       console.error(e.error.mensaje);
       Swal.fire('Login inválido', e.error.mensaje, 'error');
       return throwError(e);
        }
      )
    );
  }

  getPorTipo(tipo:string):Observable<Persona[]>{
    return this.http.get<Persona[]>( Constantes.URL_BASE_API+Constantes.URL_PERSONAS+"listar-tipo/"+tipo);
  }
}
