import { Documento } from './../modelo/Documento';

export class Kardex {

    id: number;
    fecha: string;
    documento: Documento; //luego documento
    tipoOperacion: string;
    producto: string;//luego producto
    cantidad: number;
    precioUnitario: number
    saldoCantidad: number;
    saldoPrecioUnitario: number;
    tipoMovimiento: string;
    detalle:string
}
