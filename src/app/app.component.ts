import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalElementService } from './global-element.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  lat:any;
  lon:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private global: GlobalElementService,
    private geolocation: Geolocation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.platform.backButton.observers.pop()
      //this.time()
      //this.splashScreen.hide();
    });
  }
  time() {
      //console.log("Hola!");
      this.getGeolocation()
      //console.log("LAT:", this.lat);
      //console.log("LON:", this.lon);
      this.global.cambiarCoordenadas(localStorage.getItem('id'),{coordenadas:JSON.stringify({lat:this.lat,lon:this.lon})}).subscribe(response=>{
        //console.log("COORD:",response)
      })
    
    
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
}
