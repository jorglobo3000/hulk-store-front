import { Documento } from './../modelo/Documento';

export class Kardex {

    id: number;
    fecha: string;
    documento: Documento; //luego documento
    tipoOperacion: string;
    producto: string;//luego producto
    cantidad: number;
    precioUnitario: number;
    total:number;
    saldoCantidad: number;
    saldoPrecioUnitario: number;
    saldoTotal:number;
    tipoMovimiento: string;
    detalle:string
}
