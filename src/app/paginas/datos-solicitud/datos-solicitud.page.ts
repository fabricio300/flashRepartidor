import { Component, OnInit } from '@angular/core';
import { Efectos } from './Efectos';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.page.html',
  styleUrls: ['./datos-solicitud.page.scss'],
})
export class DatosSolicitudPage implements OnInit {
  efectos=new Efectos()



  servicios=[
    {
      servicio:"Lavado de ropa",
      unidad:"kilo",
      precio:30,
      cantidad:0,
    },
    {
      servicio:"Ropa de cama",
      unidad:"pieza",
      precio:10,
      cantidad:0,
      
    },
    {
      servicio:"Planchado",
      unidad:"kilo",
      precio:20,
      cantidad:0,
      
    },
    {
      servicio:"lavado de cortinas",
      unidad:"pieza",
      precio:20,
      cantidad:0,
      
    }

  ]

  conste_de_transporte=30
  total=0
  constructor() { }

  ngOnInit() {
  }


  optenrTotal(){
    this.total=0
    let res=0
    this.servicios.forEach(element => {
      var elemento:any 
      elemento=document.getElementById(element.servicio)
      console.log(elemento.value);
      
        this.total=parseInt(elemento.value)+this.total
     

    });
    this.total=this.conste_de_transporte+this.total

  }

}
