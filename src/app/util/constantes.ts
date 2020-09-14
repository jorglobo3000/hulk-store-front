import { environment } from "../../environments/environment";


export const Constantes = Object.freeze({

    MENSAJE_NO_STOCK_DISPONIBLE: 'El producto no cuenta con stock',
    TIPO_DOCUMENTO_CARRITO:'CAR',
    ESTADO_ACTIVO:'ACT',
    MENSAJE_PRODUCTO_ANADIDO_CARRITO:'Producto añadido al carrito',
    MENSAJE_INSUFICIENTE_STOCK_DISPONIBLE:'Solo puede seleccionar la cantidad de: ',
    URL_BASE_API:environment.apiURL,
    URL_PRODUCTOS:'productos/',
    URL_PERSONAS:'clientes/',
    URL_KARDEX: 'kardex/',
    URL_CATEGORIAS: 'categorias/',
    URL_DOCUMENTOS:'documentos/'

})