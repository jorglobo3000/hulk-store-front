import { Component, OnInit } from '@angular/core';
import { DataServicio } from '../../servicio/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  titulo: string = "Kulk Store";

  constructor() {
  }

  ngOnInit(): void {
  }



}
