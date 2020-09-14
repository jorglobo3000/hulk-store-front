import { Injectable } from '@angular/core';
import { Documento } from '../modelo/documento';
import { Persona } from '../modelo/persona';

@Injectable({
    providedIn: 'root'
})

export class DataServicio {
    carrito: Documento = null;
    usuario: Persona = null;
    ruta: string = null;
    constructor() { }

    getCarrito() {
        return this.carrito;
    }
}
