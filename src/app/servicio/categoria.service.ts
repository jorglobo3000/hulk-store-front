import { Injectable } from '@angular/core';
import { HttpClient } from '@Angular/common/http';
import { Categoria } from '../modelo/Producto';
import { Observable } from 'rxjs';
import { Constantes } from '../util/constantes';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>( Constantes.URL_BASE_API+Constantes.URL_PRODUCTOS+"listar");
  }
}
