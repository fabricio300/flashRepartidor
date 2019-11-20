import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { GlobalElementService } from 'src/app/global-element.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  servicio='../../../assets/iconos/vespa4.png'
  descansando='../../../assets/iconos/hot-coffee-rounded-cup-on-a-plate-from-side-view.png'
  status='../../../assets/iconos/stategy.png'
  stadoDelRepartidor=0
  repartidor;
  lat:string
  lon:string


  pedidos:any;
  inicio=[]

  constructor(
    private menu: MenuController,
    private alertacontroller: AlertController,
    private global:GlobalElementService,
    public geolocation:Geolocation,
    private router: Router,
    private socket: Socket,
    private route: ActivatedRoute,
  ) { 
    this.inicio=[]
    console.log("repartidor",localStorage.getItem('id'));
    
    socket.on('repartidor_nuevo_pedido'+localStorage.getItem('id'),(data)=>{
      console.log("Ejecuta",data);
      
      this.ngOnInit()
    })
        socket.on('asignar_repartidor'+localStorage.getItem('id'),(data)=>{
      console.log("Ejecuta",data);
      
      this.ngOnInit()
    })
  }
  ionViewWillEnter() {
    console.log("Hola");
    
    this.route.queryParams.subscribe(params => {
      if(params.special == 'atras'){
        this.inicio=[]
        this.inicio1()
      }else{

      }
    });
  }
  ngOnInit() {
    this.inicio=[]
    console.log("limpio");
            
    this.global.getUsuarioEspecifico(localStorage.getItem('id')).subscribe(response=>{
      this.repartidor = response
      console.log("AQUI ESTA EL REPARTIDOR:", this.repartidor);
      
      this.estado(this.repartidor.status)
    });
    this.global.getPedidos(localStorage.getItem('id')).subscribe(response=>{
      this.inicio=[]
      console.log(response[0]);
      let cosa:any = response
      cosa.forEach(element => {
        console.log(element)
        this.inicio.push({
          coordenadas_lavanderia: JSON.parse(element.coordenadas_lavanderia),
          coordenadas_repartidor: JSON.parse(element.coordenadas_repartidor),
          coordenadas_usuario: JSON.parse(element.coordenadas_usuario),
          datos_ropa: element.datos_ropa,
          direccion_lavanderia: element.direccion_lavanderia,
          direccion_usuario: element.direccion_usuario,
          fecha_pedido: JSON.parse(element.fecha_pedido),
          id: element.id,
          indicaciones: element.indicaciones,
          lavanderia_id: element.lavanderia_id,
          precio: JSON.parse(element.precio),
          repartidor_id: element.repartidor_id,
          status: element.status,
          usuario_id: element.usuario_id,
          direcciones :element.direccion_usuario,
          servicios:JSON.parse(element.servicios),
          tipo_entrega:element.tipo_entrega
        })
        console.log("INICIO:",this.inicio)
        
      });
      
      this.pedidos = response;
    })
    //this.time();
  }
  inicio1() {
    this.inicio=[]
    this.global.getPedidos(localStorage.getItem('id')).subscribe(response=>{
      this.inicio=[]
      console.log(response[0]);
      console.log("lksdufynaiweuyrviayuweorvaywervayuwoeriuvyabwoeiryaweiu");
      
      let cosa:any = response
      cosa.forEach(element => {
        console.log(element)
        this.inicio.push({
          coordenadas_lavanderia: JSON.parse(element.coordenadas_lavanderia),
          coordenadas_repartidor: JSON.parse(element.coordenadas_repartidor),
          coordenadas_usuario: JSON.parse(element.coordenadas_usuario),
          datos_ropa: element.datos_ropa,
          direccion_lavanderia: element.direccion_lavanderia,
          direccion_usuario: element.direccion_usuario,
          fecha_pedido: JSON.parse(element.fecha_pedido),
          id: element.id,
          indicaciones: element.indicaciones,
          lavanderia_id: element.lavanderia_id,
          precio: JSON.parse(element.precio),
          repartidor_id: element.repartidor_id,
          status: element.status,
          usuario_id: element.usuario_id,
          direcciones :element.direccion_usuario,
          servicios:JSON.parse(element.servicios),
          tipo_entrega:element.tipo_entrega
        })
        console.log("INICIO:",this.inicio)
        
      });
      
      this.pedidos = response;
    })

  }

  time() {
    if(this.stadoDelRepartidor==1){
      console.log("Hola!");
      this.getGeolocation()
      console.log("LAT:", this.lat);
      console.log("LON:", this.lon);
      this.global.cambiarCoordenadas(localStorage.getItem('id'),{coordenadas:JSON.stringify({lat:this.lat,lon:this.lon})}).subscribe(response=>{
        console.log("COORD:",response)
      })
    }
    
    
    setTimeout(() => {
      this.time();
  }, 15000);
  }
  
  getGeolocation(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = ""+geoposition.coords.latitude;
      this.lon = ""+geoposition.coords.longitude;
    });
  }
  
  openFirst() {
    console.log("LO HACE");
    
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  irApedido(pedido){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(pedido)
      }
    };
    //console.log(pedido);
    this.router.navigate(['/datos-solicitud'], navigationExtras);
    //this.router.navigate(['/pedido'])
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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
  async verAlertaError(){
    const alerta=await this.alertacontroller.create({
      header:'¡Contraseña incorrecta!',
      subHeader:'Su contraseña no coicide',
      buttons:['Aceptar']

  })

  await alerta.present()
  localStorage.setItem('primera','false')
  }
  editar(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify({
          edicion:"true",
          id:this.repartidor.id
        })
      }
    };
    localStorage.setItem('editar','true')
    this.router.navigate(['/login'], navigationExtras);
    
  }

  cerrarSesion(){
    localStorage.clear()
    this.router.navigate(['/login'])
    this.menu.close('first');
  }

  async presentAlertPrompt() {
    const alert = await this.alertacontroller.create({
      header: 'Ingrese su contraseña antes de editar su usuario',
      inputs: [
        {
          name: 'contraseña',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (cosa) => {
            console.log('Confirm Ok');
            let item={
              correo_electronico:this.repartidor.correo_electronico,
              contraseña:cosa.contraseña
            }
            this.global.login(item).subscribe(response=>{
              console.log(response);
              localStorage.setItem('id',response[0].id)
              this.editar()//////////////////////////
            },error=>{
              console.log("error");
              this.verAlertaError()
            })
          }
        }
      ]
    });
  
    await alert.present();
  }

}
