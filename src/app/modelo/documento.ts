import { Persona } from './persona';
import { Producto } from './producto';

export class Documento {
    id: number;
    numeroDocumento: string;
    fecha: string;
    persona: Persona;
    tipoDocumento: string;
    estado: string;
    formaPago: string;
    numeroTarjeta: string;
    detalle: DetalleDocumento[];
    subtotal: number;
    iva: number;
    total: number;
}

export class DetalleDocumento {
    id: number;
    producto: Producto;
    cantidad: number;
    subtotalProducto: number;
    estado: string;
}