import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Efectos } from './Efectos';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
 
declare var google;
@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.page.html',
  styleUrls: ['./datos-solicitud.page.scss'],
})
export class DatosSolicitudPage implements OnInit {
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  map: any;
  address:string;
  efectos=new Efectos()
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {
  }


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

  ngOnInit() {
    this.loadMap();
  }
 
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      console.log("lat:",latLng)
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });
 
    }).catch((error) => {
      console.log('Error getting location', error);
    });
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
        console.log("asfa",this.address)
      })
      .catch((error: any) =>{ 
        this.address = "Address Not Available!";
      });
 
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
