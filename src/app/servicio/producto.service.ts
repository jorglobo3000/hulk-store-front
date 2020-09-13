import { Injectable } from '@angular/core';
import { Producto } from "../modelo/producto";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@Angular/common/http';
import { Constantes } from '../util/constantes';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>( Constantes.URL_BASE_API+Constantes.URL_PRODUCTOS+"listar");
  }

  getStock(id:number):Observable<any>{
    let url=Constantes.URL_BASE_API+Constantes.URL_PRODUCTOS+"stock/"+id.toString();
    return this.http.get<number>(url);
  }
}
