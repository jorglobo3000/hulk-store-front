import { Injectable } from '@angular/core';
import { Documento } from '../modelo/documento';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataServicio {
    carrito: Documento = null;
    constructor() { }

    getCarrito(){
        return this.carrito;
    }
}
