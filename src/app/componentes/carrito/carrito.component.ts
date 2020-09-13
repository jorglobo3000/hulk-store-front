import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Documento, DetalleDocumento } from '../../modelo/documento';
import { DataServicio } from '../../servicio/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaService } from '../../servicio/persona.service';
import { Persona } from '../../modelo/persona';

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

  displayedColumns: string[] = ['id', 'producto', 'cantidad', 'precio', 'subtotal'];
  dataSource;
  pageSize = 2;
  length = 0;
  currentPage: number = 0;
  existenRegistros: boolean = false;
  persona: Persona = new Persona();

  @ViewChild(MatPaginator) paginador: MatPaginator;
  consumidorFinal: boolean = true;
  formasPago: FormaPago[] = [
    {value: 'EFECTIVO', viewValue: 'Pago en efectivo'},
    {value: 'DEBITO', viewValue: 'Debito bancario'},
    {value: 'CREDITO', viewValue: 'Tarjeta de credito'},
    {value: 'CHEQUE', viewValue: 'Cheque'}
  ];

  constructor(private data: DataServicio, private personaServicio: PersonaService) { }

  ngOnInit(): void {



    this.dataSource = new MatTableDataSource<any>();
    this.cargarDetalles();
    this.cargarPersona();
  }


  ngAfterViewInit() {
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

  comprar(){
    console.log("compraremos");
  }

}
