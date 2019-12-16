import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-status',
  templateUrl: './info-status.page.html',
  styleUrls: ['./info-status.page.scss'],
})
export class InfoStatusPage implements OnInit {

  cancel='../../../assets/iconos/cross.png'
  lava='../../../assets/iconos/washing-machine2.png'
  moto0='../../../assets/iconos/vespa4.png'
  moto1='../../../assets/iconos/vespa3.png'
  moto2='../../../assets/iconos/vespa2.png'
  nuevo='../../../assets/iconos/new-product.png'
  finalsizadp='../../../assets/iconos/check-mark.png'
  esperando='../../../assets/iconos/help.png'


  item_anterior:any

  status=[
    {
      status:'Nuevo pedido',
      icon:this.nuevo,
      info:'Se ha solicitado los servicios de una lavandería determinada. En este staus se puede realizar la cancelación del servicio, una vez se realice el cambio de status no podrá cancelarse.',
    },
    {
      status:'Recogiendo',
      icon:this.moto0,
      info:'Indica que un repartidor se dirige a recoger la ropa para después transportarla a la lavandería selecciona.',
    },
    {
      status:'A lavandería',
      icon:this.moto2,
      info:'Indica que el repartidor se dirige a la lavandería selecciona para entregar la ropa.',
    },
    {
      status:'En proceso',
      icon:this.lava,
      info:'La ropa ha sido entregada a la lavandería seleccionada para el cumplimento de la solicitud.',
    },
    /*{
      status:'Lista y limpia',
      icon:this.esperando,
      info:'La ropa esta lista para que pase por ella a la lavandería seleccionada. Este se mostrará cuando se solicite un servicio de: “solo deseo entregar ropa a lavandería”.',
    },*/
    {
      status:'Entregando',
      icon:this.moto1,
      info:'Indica que la ropa esta lista y un repartidor se dirige a entregarla.',
    },
    /*{
      status:'Finalizado',
      icon:this.finalsizadp,
      info:'Indica que la solicitud a sido cumplida y la ropa lista se ha sido entregada correctamente.',
    },*/
    /*{
      status:'Cancelado',
      icon:this.cancel,
      info:'La solicitud de servicio fue cancelada o rechazada.',
    }*/
  ]

  constructor() { }

  ngOnInit() {
  }


  verInfo(item:any){
    
    if(this.item_anterior!=null && this.item_anterior.status!=item.status){
      this.ocultarInfo(this.item_anterior.status)
    }


    if(this.item_anterior!=null){
      if(this.item_anterior.status==item.status){
        this.ocultarInfo(this.item_anterior.status)
        this.item_anterior=null
      }else{
        this.mostrarInfo(item.status)
        this.item_anterior=item
        
      } 
    }else{
      this.mostrarInfo(item.status)
      this.item_anterior=item
    }
       
    
    

   

  }


  ocultarInfo(id){
    document.getElementById(id).style.transition="0.5s"
    document.getElementById(id).style.display="none"
  }


  mostrarInfo(id){
    document.getElementById(id).style.transition="0.5s"
    document.getElementById(id).style.display="block"
  }
}
