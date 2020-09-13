import { Injectable } from '@angular/core';
import { Kardex } from '../modelo/kardex';
import { Observable } from 'rxjs';
import { HttpClient } from '@Angular/common/http';
import { Constantes } from '../util/constantes';

@Injectable({
  providedIn: 'root'
})
export class KardexService {

  constructor(private http: HttpClient) { }

  getMovimientos(idProducto): Observable<Kardex[]> {
    return this.http.get<Kardex[]>( Constantes.URL_BASE_API+Constantes.URL_KARDEX+"listar/"+idProducto);
  }
}
