import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductoComponent, DialogAnadirCarrito } from './componentes/producto/producto.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ProductoService } from "./servicio/producto.service";
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { KardexComponent } from './componentes/kardex/kardex.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: ProductoComponent },
  { path: 'productos', component: ProductoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'kardex', component: KardexComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: AppComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    HeaderComponent,
    FooterComponent,
    DialogAnadirCarrito,
    KardexComponent,
    CarritoComponent,
    LoginComponent,
    MenuComponent


  ],
  entryComponents: [
    DialogAnadirCarrito
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MDBBootstrapModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
