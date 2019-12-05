import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {  SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { HttpClientModule } from '@angular/common/http';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { ModalPage, ModalPage2 } from './paginas/login/login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

const config: SocketIoConfig = { url: 'http://165.227.60.169', options: {} };
 

@NgModule({
  declarations: [AppComponent,ModalPage,ModalPage2],
  entryComponents: [ModalPage,ModalPage2],
  imports: 
  [
  SocketIoModule.forRoot(config),
  HttpClientModule,
  BrowserModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    Geolocation,
    AndroidPermissions,
    LocationAccuracy,
    NativeGeocoder, 
    GoogleMaps,
    FCM,
    LocalNotifications,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
