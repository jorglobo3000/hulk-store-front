import { Injectable } from '@angular/core';

import { Constantes } from '../util/constantes';
import { Documento, DetalleDocumento } from '../modelo/documento';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@Angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http: HttpClient) { }

  realizarVentaACliente(documento: Documento): Observable<Documento> {
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.post<Documento>(Constantes.URL_BASE_API + Constantes.URL_DOCUMENTOS + "vender", documento, { headers: headers }).pipe(
      catchError(
        e => {
          Swal.fire('Error ', e.error.mensaje, 'error');
          return throwError(e);
        }
      )
    );
  }

  realizarCompraAProveedor(documento: DetalleDocumento): Observable<DetalleDocumento> {
    let headers = new HttpHeaders().set('Content-Type', "application/json");
    return this.http.post<DetalleDocumento>(Constantes.URL_BASE_API + Constantes.URL_DOCUMENTOS + "comprar", documento, { headers: headers }).pipe(
      catchError(
        e => {
          Swal.fire('Error ', e.error.mensaje, 'error');
          return throwError(e);
        }
      )
    );
  }

}
