import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { GlobalElementService } from 'src/app/global-element.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  servicio='../../../assets/iconos/vespa4.png'
  descansando='../../../assets/iconos/hot-coffee-rounded-cup-on-a-plate-from-side-view.png'
  stadoDelRepartidor=0
  repartidor;


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

  pedidos;









  constructor(
    private menu: MenuController,
    private alertacontroller: AlertController,
    private global:GlobalElementService,

  ) { }

  ngOnInit() {
    this.global.getUsuario(localStorage.getItem('id')).subscribe(response=>{
      this.repartidor = response[0]
      this.estado(this.repartidor.status)
    })
    this.global.getPedidos(localStorage.getItem('id')).subscribe(response=>{
      console.log("pedidos:", response)
      this.pedidos = response;
    })
    if(localStorage.getItem('primera')=='true'){
      this.verAlerta()
    }
    
  }

  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }







  estado(stado){
    console.log("Estado");
    
    this.servicio='../../../assets/iconos/vespa4.png'
    this.descansando='../../../assets/iconos/hot-coffee-rounded-cup-on-a-plate-from-side-view.png'

      if(stado==1){
        this.servicio='../../../assets/iconos/vespa5.png'
        this.stadoDelRepartidor=1
        this.global.cambiarStatus(localStorage.getItem('id'),{'status':this.stadoDelRepartidor}).subscribe(response=>{
        })
      }else{
        this.stadoDelRepartidor=2
        this.global.cambiarStatus(localStorage.getItem('id'),{'status':this.stadoDelRepartidor}).subscribe(response=>{
        })
        this.descansando='../../../assets/iconos/hot-coffee-rounded-cup-on-a-plate-from-side-view (1).png'
      }

  }
  async verAlerta(){
    const alerta=await this.alertacontroller.create({
      header:'¡Primera vez!',
      subHeader:'Ingrese su status en el que se encuentra ahora',
      message:'Si esta disponible para trabajar pulse en "En servicio", si no es asi pulse en "Descansando"',
      buttons:['Aceptar']

  })

  await alerta.present()
  localStorage.setItem('primera','false')
  }

}
