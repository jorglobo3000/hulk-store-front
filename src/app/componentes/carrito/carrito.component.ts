import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Documento, DetalleDocumento } from '../../modelo/documento';
import { DataServicio } from '../../servicio/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaService } from '../../servicio/persona.service';
import { Persona } from '../../modelo/persona';
import { DocumentoService } from '../../servicio/documento.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  displayedColumns: string[] = ['id', 'producto', 'cantidad', 'precio', 'subtotal', 'acciones'];
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


  constructor(public data: DataServicio, private personaServicio: PersonaService,
    private documentoServicio: DocumentoService, private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    if (this.data.carrito != null && this.data.carrito.detalle.length>0) {
      this.dataSource = new MatTableDataSource<any>();
      this.cargarDetalles();
      //this.cargarPersona();
    }
    else{
      this.router.navigate(["/productos"]);
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
        console.log("persona: " + this.persona);
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
          this.openSnackBar("Compra realizada con exito", "");
          this.router.navigate(["/"]);
        }
      }
    );
    console.log("compraremos");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  borrarItem(elemento) {
    console.log(this.carritoCompras.detalle);

    this.removeItemArray(this.carritoCompras.detalle, elemento);
    console.log(this.carritoCompras.detalle);
   
    this.cargarDataSourcePaginador();
    this.calcularTotales();
    this.openSnackBar("Item borrado con éxito","");
    if(this.carritoCompras.detalle.length<=0){
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

}
