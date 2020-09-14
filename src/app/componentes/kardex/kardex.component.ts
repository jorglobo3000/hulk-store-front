import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KardexService } from '../../servicio/kardex.service';
import { Producto } from '../../modelo/Producto';
import { ProductoService } from '../../servicio/producto.service';
import { Kardex } from '../../modelo/kardex';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fecha', 'detalle', 'ecantidad', 'evunitario', 'etotal', 'scantidad', 'svunitario', 'stotal', 'excantidad', 'exvunitario', 'extotal'];
  dataSource;
  pageSize = 2;
  length = 0;
  currentPage: number = 0;
  existenRegistros: boolean = false;
  @ViewChild(MatPaginator) paginador: MatPaginator;

  idProducto: number = 0;
  productos: Producto[] = [];
  producto: Producto = null;

  constructor(private kardexServicio: KardexService,
     private _snackBar: MatSnackBar,
    private productoService: ProductoService) { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource<any>();
    this.cargarProductos();
  }

  cargarProducto() {
    this.productoService.getPorId(this.idProducto).subscribe(
      (producto) => this.producto = producto
    );
  }

  cargarKardexProducto() {
    this.kardexServicio.getMovimientos(this.idProducto).subscribe(
      (movimientos) => {
        this.dataSource = new MatTableDataSource<Kardex>(movimientos);
        this.paginador.length = movimientos.length;
        this.dataSource.paginator = this.paginador;

        if (movimientos!= null && movimientos.length>0) {
          this.length = movimientos.length;
          this.existenRegistros = true;
        }
        else {
          this.openSnackBar("No existen movimientos para el producto","");
          this.existenRegistros = false;
        }
      }
    );
  }

  cargarKardex() {
    this.cargarProducto();
    this.cargarKardexProducto();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe(
      (productos) => {
        this.productos = productos;
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
