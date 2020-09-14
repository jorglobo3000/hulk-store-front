import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../modelo/persona';
import { Constantes } from '../util/constantes';
import { HttpClient, HttpHeaders } from '@Angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }

  getPersonaPorIdentificacion(identificacion:string):Observable<Persona> {
    console.log( Constantes.URL_BASE_API+Constantes.URL_PERSONAS+"listar/"+identificacion);
    return this.http.get<Persona>( Constantes.URL_BASE_API+Constantes.URL_PERSONAS+"listar/"+identificacion);
  }

  getLogin(persona:Persona):Observable<Persona>{
    let headers=new HttpHeaders().set('Content-Type', "application/json");
    return this.http.post<Persona>( Constantes.URL_BASE_API+Constantes.URL_PERSONAS+"login", persona,{headers:headers});
  }

  getPorTipo(tipo:string):Observable<Persona[]>{
    return this.http.get<Persona[]>( Constantes.URL_BASE_API+Constantes.URL_PERSONAS+"listar-tipo/"+tipo);
  }
}
