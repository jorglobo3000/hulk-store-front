import { Injectable } from '@angular/core';
import { Producto } from "../modelo/producto";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@Angular/common/http';
import { Constantes } from '../util/constantes';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(Constantes.URL_BASE_API + Constantes.URL_PRODUCTOS + "listar").pipe(
      catchError(
        e => {
          Swal.fire('Error al listar productos', e.error.mensaje, 'error');
        return throwError(e);
        }
      )
    );
  }

  getStock(id: number): Observable<any> {
    let url = Constantes.URL_BASE_API + Constantes.URL_PRODUCTOS + "stock/" + id.toString();
    return this.http.get<number>(url);
  }

  getPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(Constantes.URL_BASE_API + Constantes.URL_PRODUCTOS + "listar/" + id);
  }

}
