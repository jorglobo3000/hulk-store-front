import { Injectable } from '@angular/core';

import { Constantes } from '../util/constantes';
import { Documento, DetalleDocumento } from '../modelo/documento';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@Angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http: HttpClient) { }

  realizarVentaACliente(documento: Documento): Observable<Documento> {
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.post<Documento>(Constantes.URL_BASE_API+Constantes.URL_DOCUMENTOS +"vender", documento, { headers: headers });
  }

  realizarCompraAProveedor(documento: DetalleDocumento): Observable<DetalleDocumento> {
    console.log(documento);
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.post<DetalleDocumento>(Constantes.URL_BASE_API+Constantes.URL_DOCUMENTOS+"comprar", documento, { headers: headers });
  }

}
