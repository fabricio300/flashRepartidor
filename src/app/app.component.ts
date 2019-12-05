import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalElementService } from './global-element.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

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
    private geolocation: Geolocation,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.platform.backButton.observers.pop()
      this.statusBar.backgroundColorByHexString('#ff0000')
      
      //this.splashScreen.hide();
      this.time()
    });
  }
  time() {
      //console.log("Se cambio coordenadas!");
      this.getGeolocation()    
    setTimeout(() => {
      this.time();
  }, 5000);
  }
  getGeolocation(){

    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = ""+geoposition.coords.latitude;
      this.lon = ""+geoposition.coords.longitude;
      this.global.cambiarCoordenadas(localStorage.getItem('id'),{coordenadas:JSON.stringify({lat:this.lat,lon:this.lon})}).subscribe(response=>{
        //console.log("COORD:",response)
      })
    });
  }
}
