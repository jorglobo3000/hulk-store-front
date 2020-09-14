import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Documento, DetalleDocumento } from '../../modelo/documento';
import { DataServicio } from '../../servicio/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaService } from '../../servicio/persona.service';
import { Persona } from '../../modelo/persona';
import { DocumentoService } from '../../servicio/documento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Constantes } from '../../util/constantes';
import { ProductoService } from '../../servicio/producto.service';

interface FormaPago {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, AfterViewInit {

  carritoCompras: Documento = null;

  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'subtotal', 'acciones'];
  dataSource;
  pageSize = 2;
  length = 0;
  currentPage: number = 0;
  existenRegistros: boolean = false;
  persona: Persona = new Persona();
  ocultar: boolean = true;
  verCampoNumeroTarjeta: boolean = false;

  @ViewChild(MatPaginator) paginador: MatPaginator;
  consumidorFinal: boolean = true;
  formasPago: FormaPago[] = [
    { value: 'EFECTIVO', viewValue: 'Pago en efectivo' },
    { value: 'DEBITO', viewValue: 'Debito bancario' },
    { value: 'CREDITO', viewValue: 'Tarjeta de credito' },
    { value: 'CHEQUE', viewValue: 'Cheque' }
  ];
  volverProductos: boolean = false;


  constructor(public data: DataServicio, private personaServicio: PersonaService,
    private documentoServicio: DocumentoService, private _snackBar: MatSnackBar,
    private router: Router,
    private productoService: ProductoService) { }

  ngOnInit(): void {

    this.validarCarrito();
    if (this.data.usuario != null) {
      this.persona = this.data.usuario;
    }
  }

  validarCarrito() {
    if (this.data.carrito != null && this.data.carrito.detalle.length > 0) {
      this.dataSource = new MatTableDataSource<any>();
      this.cargarDetalles();
      this.volverProductos = false;
      //this.cargarPersona();
    }
    else {
      this.volverProductos = true;
      //this.router.navigate(["/productos"]);
    }
  }

  ngAfterViewInit() {
    this.cargarDataSourcePaginador();
  }

  cargarDataSourcePaginador() {
    this.paginador.length = this.carritoCompras.detalle.length;
    this.dataSource.paginator = this.paginador;

    if (this.dataSource != null) {
      this.length = this.dataSource.length;
      this.existenRegistros = true;
    }
    else {
      this.existenRegistros = false;
    }
    this.dataSource.paginator = this.paginador;
  }

  cargarDetalles() {
    this.carritoCompras = this.data.carrito;
    this.dataSource = new MatTableDataSource<DetalleDocumento>(this.data.carrito.detalle);


    this.calcularTotales();
  }

  calcularTotales() {
    this.carritoCompras.subtotal = 0;
    this.carritoCompras.iva = 0;
    this.carritoCompras.total = 0;
    this.carritoCompras.detalle.forEach(element => {
      this.carritoCompras.subtotal += element.subtotalProducto;
    });

    this.carritoCompras.iva = this.carritoCompras.subtotal * 0.12;
    this.carritoCompras.total = this.carritoCompras.subtotal + this.carritoCompras.iva;
  }

  cargarPersona() {
    if (this.persona.identificacion == null || typeof this.persona.identificacion === 'undefined') {
      this.persona.identificacion = "9999999999";
    }
    this.personaServicio.getPersonaPorIdentificacion(this.persona.identificacion).subscribe(
      (persona) => {
        this.persona = persona;
      });

  }

  comprar() {
    if (this.data.usuario != null) {
      this.router.navigate(["/carrito"]);
    }
    else {
      this.router.navigate(["/login"]);
    }
    this.carritoCompras.persona = this.data.usuario;
    this.documentoServicio.realizarVentaACliente(this.carritoCompras).subscribe(
      (documento) => {
        if (documento != null) {
          this.data.carrito = null;
          this.openSnackBar("Compra realizada con exito", "");
          this.router.navigate(["/"]);
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  borrarItem(elemento) {
    this.removeItemArray(this.carritoCompras.detalle, elemento);
    this.cargarDataSourcePaginador();
    this.calcularTotales();
    this.openSnackBar("Item borrado con éxito", "");
    if (this.carritoCompras.detalle.length <= 0) {
      this.router.navigate(["/productos"]);
    }
  }

  removeItemArray = (array, item) => {
    var i = array.indexOf(item);
    i !== -1 && array.splice(i, 1);
  };

  onSelectFormaPagoChange() {
    if (this.carritoCompras.formaPago == 'DEBITO' || this.carritoCompras.formaPago == 'CREDITO') {
      this.verCampoNumeroTarjeta = true;
    }
    else {
      this.verCampoNumeroTarjeta = false;
    }
  }

  onConsumidorFinalCheckChange() {
    this.consumidorFinal = !this.consumidorFinal;
    if (this.consumidorFinal) {
      this.cargarPersona();
    }
    else {
      this.persona = this.data.usuario;
    }
  }

  aumentarCantidad(elemento) {
    elemento.cantidad += 1;
    this.productoService.getStock(elemento.producto.id).subscribe(
      (stockProducto) => {
        if (stockProducto == 0) {
          this.openSnackBar(Constantes.MENSAJE_NO_STOCK_DISPONIBLE, "");
        }
        else if (stockProducto >= elemento.cantidad) {
          elemento.subtotalProducto = elemento.cantidad * elemento.producto.precioVenta;
          this.calcularTotales();
        }
        else {
          elemento.cantidad = elemento.cantidad - 1;
          this.openSnackBar(Constantes.MENSAJE_INSUFICIENTE_STOCK_DISPONIBLE + stockProducto, "");
        }
      });

  }
  disminuirCantidad(elemento) {
    elemento.cantidad = elemento.cantidad - 1;
    if (elemento.cantidad <= 0) {
      elemento.cantidad = 1;
    }
    elemento.subtotalProducto = elemento.cantidad * elemento.producto.precioVenta;
    this.calcularTotales();

  }

}
