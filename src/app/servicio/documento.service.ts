import { Injectable } from '@angular/core';

import { Constantes } from '../util/constantes';
import { Documento } from '../modelo/documento';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@Angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http: HttpClient) { }

  realizarVentaACliente(documento: Documento): Observable<Documento> {
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.post<Documento>("http://localhost:8080/api/documentos/vender", documento, { headers: headers });
  }

  realizarCompraAProveedor(documento: Documento): Observable<Documento> {
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.post<Documento>("http://localhost:8080/api/documentos/vender", documento, { headers: headers });
  }

}
