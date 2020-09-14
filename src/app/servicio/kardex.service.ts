import { Injectable } from '@angular/core';
import { Kardex } from '../modelo/kardex';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@Angular/common/http';
import { Constantes } from '../util/constantes';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class KardexService {

  constructor(private http: HttpClient) { }

  getMovimientos(idProducto): Observable<Kardex[]> {
    return this.http.get<Kardex[]>( Constantes.URL_BASE_API+Constantes.URL_KARDEX+"listar/"+idProducto).pipe(
      catchError(
        e=> {
          Swal.fire('Error al listar kardex',e.error.mensaje,'error');
          return throwError(e);
        }
      )
    );
  }
}
