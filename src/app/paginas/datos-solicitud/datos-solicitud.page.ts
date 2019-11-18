import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Efectos } from './Efectos';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalElementService } from 'src/app/global-element.service';
import { AlertController } from '@ionic/angular';
 
declare var google;
@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.page.html',
  styleUrls: ['./datos-solicitud.page.scss'],
})
export class DatosSolicitudPage implements OnInit {
  @ViewChild('map', {static: true}) mapElement: ElementRef;
  map: any;
  prueba = 0;
  address:string;
  latUsuario:any;
  lonUsuario:any;
  pedido: any;
  mostrarPesajeVal = 0;
  mostrarRutaVal = 0;
  mostrarInicio = 0;
  servicios =[];
  ofertas =[];
  efectos=new Efectos()
  botonEnvio=1;


  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints=[];


  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private route: ActivatedRoute,
    private router: Router,
    private global:GlobalElementService,
    private alertacontroller: AlertController
    ) {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.bounds = new google.maps.LatLngBounds();
      this.route.queryParams.subscribe(params => {
        this.pedido = JSON.parse(params.special);
        console.log("INFO DE PEDIDO:",this.pedido)
        this.servicios =[];
        if(this.pedido.servicios.lavanderia!=null){
        this.pedido.servicios.lavanderia.forEach(element => {
          this.servicios.push(element)
        });
        }
        if(this.pedido.servicios.tintoreria!=null){
        this.pedido.servicios.tintoreria.forEach(element => {
          this.servicios.push(element)
        });
        }
        if(this.pedido.servicios.planchado!=null){
        this.pedido.servicios.planchado.forEach(element => {
          let servicio = element;
          servicio.servicio = "Planchado"
          this.servicios.push(servicio)
        });
        }
        if(this.pedido.servicios.otro!=null){
          this.pedido.servicios.otro.forEach(element => {
            this.servicios.push(element)
          });
        }
        
        console.log("SERVICIOS:",this.servicios);
        
        this.global.getUsuarioPedido(this.pedido.usuario_id).subscribe(response=>{
          this.pedido.nombre_usuario = response[0].nombres + " " + response[0].apellidos 
        })
        this.global.getLavanderia(this.pedido.lavanderia_id).subscribe(response=>{
          this.pedido.nombre_lavanderia = response[0].nombre_lavanderia
          this.pedido.telefono_lavanderia =response[0].telefono
          this.obtenerServicios(this.pedido.lavanderia_id);
        })
    });
      
    
  }
  conste_de_transporte=30
  total=0

  ngOnInit() {
    if(this.pedido.status=="A lavandería") {
      this.botonEnvio = 0;
    }
    this.waypoints=[];
    this.crearWayspoints();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadMap(resp);
    });
    
    this.getCoordsFromAddress();
  }
  
  addMarker(map:any){
    //REMPAZAR CON CORDENADAS DE LAVADERIA
    this.getCoordsFromAddress()
    let latLng = new google.maps.LatLng(this.latUsuario,this.lonUsuario);
    //this.getAddressFromCoords(16.7755649,-93.0947572)
    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    
    let content = "Domicilio del cliente";
    
    this.addInfoWindow(marker, content);
    
    
    
  }

  addInfoWindow(marker, content){

      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
  
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
    let panelEle: HTMLElement = document.getElementById('panel');
  
    // create LatLng object
    this.myLatLng = {lat: latitude, lng: longitude};
  
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 10,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      rotateControl: false
    });
  
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(panelEle);
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }
  
  private calculateRoute(){
    this.bounds.extend(this.myLatLng);

    this.waypoints.forEach(waypoint => {
      console.log("cueta");
      
      var point = new google.maps.LatLng(waypoint.location.lat, waypoint.location.lng);
      this.bounds.extend(point);
    });
  
    this.map.fitBounds(this.bounds);

    this.directionsService.route({
      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      destination: new google.maps.LatLng(this.pedido.coordenadas_lavanderia.lat,this.pedido.coordenadas_lavanderia.lon),
      waypoints: this.waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, (response, status)=> {
      if(status === google.maps.DirectionsStatus.OK) {
        console.log(response);
        this.directionsDisplay.setDirections(response);
      }else{
        alert('Could not display directions due to: ' + status);
      }
    });  
  }

  crearWayspoints() {
    this.waypoints.push(
      {
        location: { lat: this.pedido.coordenadas_usuario.lat, lng: this.pedido.coordenadas_usuario.lon },
        stopover: true,
      });
      /*this.waypoints.push(
      {
        location: { lat: this.pedido.coordenadas_lavanderia.lat, lng: this.pedido.coordenadas_lavanderia.lon },
        stopover: true,
      });*/
      console.log("WAYSPOINTS:", this.waypoints);
      
  }
 
  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);
 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{ 
        this.address = "Address Not Available!";
      });
 
  }

  getCoordsFromAddress() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.forwardGeocode(this.pedido.direccion_usuario, options)
  .then((result: NativeGeocoderForwardResult[]) => {
    this.address = 'The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude;
    console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude)
    this.latUsuario = result[0].latitude
    this.lonUsuario = result[0].longitude
  })
  .catch((error: any) => console.log(":C",error));
  }

  optenrTotal(){
    this.total=0
    let res=0
    this.servicios.forEach(element => {
      var elemento:any 
      elemento=document.getElementById(element.servicio)
      console.log(elemento.value);
      if(elemento.value==""){
        this.total=this.total + 0
      }else{
        this.total=parseInt(elemento.value)+this.total
      }

     

    });
    this.total=this.conste_de_transporte+this.total

  }

  async verAlerta(){
      const alerta=await this.alertacontroller.create({
        header:'¡Aviso!',
        subHeader:'Una vez aceptado el precio no será modificable',
        message:'Asegurese que el precio sea correcto',
        buttons: [
          {
            text: 'Revisar precio',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Precio verificado',
            handler: () => {
              console.log('Confirm Okay');
              this.aceptarPrecio()
            }
          }
        ]

    })

    await alerta.present()
  }

  aceptarEnvio() {
      this.botonEnvio = 0;
      /*this.global.cambiarStatusPedido(this.pedido.id,{status:"Recogiendo"}).subscribe(response=>{
        console.log("Cambiando status...");
        
      });*/

  }

  obtenerServicios(lavanderia_id) {
      this.global.getServiciosOferta(lavanderia_id).subscribe(response=>{
        this.ofertas =[];
        let ofertas = JSON.parse(response[0].servicio)
        ofertas.forEach(element => {
          this.ofertas.push(element)
        });
      });
  }

  back() {
    if(this.mostrarInicio != 1){
      this.router.navigate(['/inicio']);
      
    }
    if(this.mostrarPesajeVal==1) {
      this.efectos.ocultarDatos()
      this.mostrarPesajeVal = 0;
      this.mostrarInicio = 0;
      
    }
    if(this.mostrarRutaVal==1) {
      this.efectos.ocultarRuta()
      this.mostrarRutaVal = 0;
      this.mostrarInicio = 0;
      
    }

    
  }

  mostrarPesaje() {
    this.efectos.mostrarDatos();
    this.efectos.ocultarRuta();
    this.mostrarPesajeVal = 1;
    this.mostrarRutaVal = 0;
    this.mostrarInicio = 1;
  }

  mostrarRuta() {
    this.efectos.mostrarRuta()
    this.mostrarRutaVal = 1;
    this.pedido.mostrarPesajeVal = 0;
    this.mostrarInicio = 1;
  }
  
  aceptarPrecio() {
    console.log("El total sera de: $",this.total);
    this.global.cambiarCostoPedido(this.pedido.id,{precio:""+this.total, status:"A lavandería"}).subscribe((response:any)=>{
      console.log("CAMBIO COSTO:",response);
      this.pedido.status = response.status;
      console.log("status: ", this.pedido.status);
      this.mostrarPesajeVal= 0;
      this.mostrarRutaVal = 1;
      this.efectos.ocultarDatos();
      this.efectos.mostrarRuta();
    })
    
  }

  entregarLavanderia() {
    this.global.cambiarStatusLavanderia(this.pedido.id,{status:"En proceso", repartidor_id:null}).subscribe(response=>{
      console.log("cambio status ", response);
      this.router.navigate(['/inicio']);
    })
  }

}
