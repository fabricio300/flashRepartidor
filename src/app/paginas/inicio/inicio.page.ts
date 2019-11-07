import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  servicio='../../../assets/iconos/vespa4.png'
  descansando='../../../assets/iconos/hot-coffee-rounded-cup-on-a-plate-from-side-view.png'
  stadoDelRepartidor=0


  menuZ=[
    {
      titulo:'pedidos',
      icon:'../../../assets/iconos/bike.png',
      url:''
    },
    {
      titulo:'Editar información',
      icon:'../../../assets/iconos/edit.png',
      url:''
    },
  ]

  solicitudes=[
    {
      id:1,
      direccion:'  Parque de la Marimba, Avenida Central Poniente, Centro, Tuxtla Gutiérrez, Chis.',
      tarea:'Recoger ropa'
    },
    {
      id:2,
      direccion:'  Parque de la Marimba, Avenida Central Poniente, Centro, Tuxtla Gutiérrez, Chis.',
      tarea:'Entregar ropa'
    },
    {
      id:1,
      direccion:'  Parque de la Marimba, Avenida Central Poniente, Centro, Tuxtla Gutiérrez, Chis.',
      tarea:'Recoger ropa'
    },
    {
      id:2,
      direccion:'  Parque de la Marimba, Avenida Central Poniente, Centro, Tuxtla Gutiérrez, Chis.',
      tarea:'Entregar ropa'
    }
  ]









  constructor(
    private menu: MenuController

  ) { }

  ngOnInit() {
  }

  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }







  estado(stado){
    console.log("asda",stado);
    this.servicio='../../../assets/iconos/vespa4.png'
    this.descansando='../../../assets/iconos/hot-coffee-rounded-cup-on-a-plate-from-side-view.png'

      if(stado==1){
        this.servicio='../../../assets/iconos/vespa5.png'
        this.stadoDelRepartidor=1
      }else{
        this.stadoDelRepartidor=2
        this.descansando='../../../assets/iconos/hot-coffee-rounded-cup-on-a-plate-from-side-view (1).png'
      }

  }

}
