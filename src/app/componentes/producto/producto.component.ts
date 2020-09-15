import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Producto } from '../../modelo/Producto';
import { ProductoService } from '../../servicio/producto.service';
import { DataServicio } from '../../servicio/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Documento, DetalleDocumento } from '../../modelo/documento';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constantes } from '../../util/constantes';
import { DocumentoService } from '../../servicio/documento.service';



export interface DialogData {
  cantidad: number;
  nombre: string;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {


  displayedColumns: string[] = ['nombre', 'stock', 'precio', 'anadir'];
  dataSource;
  pageSize = 5;
  length = 0;
  currentPage: number = 0;
  existenRegistros: boolean = false;
  carrito: Documento = new Documento();
  esAdministrador: boolean = false;
  cantidad = 0;
  nombreBotonCarrito: string = null;
  detalleDocumento: DetalleDocumento = new DetalleDocumento();
  productos: Producto[] = [];
  verAumentarStock: boolean = false;

  @ViewChild(MatPaginator) paginador: MatPaginator;
  constructor(private productoService: ProductoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public data: DataServicio, private documentoServicio: DocumentoService) { }

  ngOnInit(): void {

    if (this.data.usuario != null) {
      this.esAdministrador = this.data.usuario.tipoPersona == 'ADM';
    }
    this.carrito = this.data.carrito;
    if (this.carrito == null) {
      this.carrito = new Documento();
    }
    if (this.carrito.detalle == null) {
      this.carrito.detalle = [];
    }
    this.dataSource = new MatTableDataSource<any>();
    this.carrito.subtotal = 0;
    this.carrito.total = 0;
    this.carrito.total = 0;
    this.calcularTotales();
    this.cargarProductos();
    this.armarNombreBotonCarrito();
    this.data.ruta = '/productos';
  }

  armarNombreBotonCarrito() {
    this.nombreBotonCarrito = this.carrito.detalle.length.toString() + " Productos | $ " + this.carrito.subtotal;
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe(
      (productos) => {
        this.dataSource = new MatTableDataSource<Producto>(productos);
        this.productos = productos;
        this.paginador.length = this.dataSource.length;
        this.dataSource.paginator = this.paginador;

        if (this.dataSource != null) {
          this.length = this.dataSource.length;
          this.existenRegistros = true;
        }
        else {
          this.existenRegistros = false;
        }
      }
    );
  }

  anadirACarrito(elemento) {
    let existe: boolean = false;
    for (let item of this.carrito.detalle) {
      if (item.producto == elemento) {
        existe = true;
      }
    }

    if (existe) {

      this.openSnackBar("Articulo ya existe en carrito de compras", "");
      return;
    }
    this.cantidad = 1;
    this.productoService.getStock(elemento.id).subscribe(
      (stockProducto) => {
        if (stockProducto == 0) {
          this.openSnackBar(Constantes.MENSAJE_NO_STOCK_DISPONIBLE, "");
        }
        else if (stockProducto >= this.cantidad) {
          this.carrito.estado = Constantes.ESTADO_ACTIVO;
          this.carrito.tipoDocumento = Constantes.TIPO_DOCUMENTO_CARRITO;
          let detalle: DetalleDocumento = new DetalleDocumento();
          detalle.producto = elemento;
          detalle.cantidad = this.cantidad;
          detalle.estado = Constantes.ESTADO_ACTIVO;

          detalle.subtotalProducto = elemento.precioVenta * this.cantidad;
          this.carrito.detalle.push(detalle);
          this.calcularTotales();
          this.armarNombreBotonCarrito();
          this.openSnackBar(Constantes.MENSAJE_PRODUCTO_ANADIDO_CARRITO, "");
        }
        else {
          this.openSnackBar(Constantes.MENSAJE_INSUFICIENTE_STOCK_DISPONIBLE + stockProducto, "");
        }
      });
  }


  openDialog(elemento): void {
    const dialogRef = this.dialog.open(DialogAnadirCarrito, {
      width: '350px',
      data: { nombre: elemento.nombre, cantidad: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!(typeof result === 'undefined')) {
        this.cantidad = result;
        if (this.cantidad > 0) {
          this.anadirACarrito(elemento);
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  verCarrito() {
    this.carrito.subtotal = 0;
    this.carrito.iva = 0;
    this.carrito.total = 0;
    this.data.carrito = this.carrito;
    this.data.ruta = '/carrito';
  }

  calcularTotales() {
    this.carrito.subtotal = 0;
    this.carrito.iva = 0;
    this.carrito.total = 0;
    this.carrito.detalle.forEach(element => {
      this.carrito.subtotal += element.subtotalProducto;
    });

    this.carrito.iva = this.carrito.subtotal * 0.12;
    this.carrito.total = this.carrito.subtotal + this.carrito.iva;
  }

  aumentarStock() {
    this.detalleDocumento = new DetalleDocumento();
    this.verAumentarStock = true;
  }

  comprarProducto() {



    this.documentoServicio.realizarCompraAProveedor(this.detalleDocumento).subscribe(
      (detalleDocumento) => {
        this.detalleDocumento = detalleDocumento;
        this.openSnackBar("Stock aumentado correctamente", "");
        this.detalleDocumento = new DetalleDocumento();
        this.cargarProductos();
      }
    );

    this.detalleDocumento = new DetalleDocumento();

  }

  volverAListado() {
    this.verAumentarStock = false;
    this.cargarProductos();
  }


}




@Component({
  selector: 'producto.component.dialog',
  templateUrl: './producto.component.dialog.html'
})
export class DialogAnadirCarrito {

  constructor(
    public dialogRef: MatDialogRef<DialogAnadirCarrito>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


