
export class Producto {
    id: number;
    categoria: Categoria;
    nombre: string
    stockEmergencia: number
    precioCompra: number;
    precioVenta: number;
    stock: number;
    estado: string;
    enStock: boolean;
    
}

export class Categoria {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string
}