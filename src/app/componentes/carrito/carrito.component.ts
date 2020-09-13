import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Documento, DetalleDocumento } from '../../modelo/documento';
import { DataServicio } from '../../servicio/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaService } from '../../servicio/persona.service';
import { Persona } from '../../modelo/persona';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

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
  if(consumidorFinal) {
    this.persona.identificacion = "9999999999";
  }

  constructor(private data: DataServicio, private personaServicio: PersonaService) { }

  ngOnInit(): void {

    console.log(this.data.carrito);

    this.dataSource = new MatTableDataSource<any>();
    this.cargarDetalles();
    this.cargarPersona();
  }

  cargarDetalles() {
    this.carritoCompras = this.data.carrito;
    this.dataSource = new MatTableDataSource<DetalleDocumento>(this.data.carrito.detalle);
    this.paginador.length = this.carritoCompras.detalle.length;
    this.dataSource.paginator = this.paginador;

    if (this.dataSource != null) {
      this.length = this.dataSource.length;
      this.existenRegistros = true;
    }
    else {
      this.existenRegistros = false;
    }

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
    this.personaServicio.getPersonaPorIdentificacion(this.persona.identificacion).subscribe(
      (persona) => {
      this.persona = persona;
        console.log(this.persona);
      });

  }

}
