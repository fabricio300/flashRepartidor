import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalElementService {
  api : string = 'https://flash-wash-01.herokuapp.com/api/v1/'
  status_de_secion=false


  constructor(private http: HttpClient) { }
  restablecer(info:any):Observable<any>{    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(`https://gentle-springs-37285.herokuapp.com/`,info, httpOptions)
  }

  registrar(info:any):Observable<any>{
    console.log("ifo=",info);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(`${this.api}repartidores`,info, httpOptions)
  }
  

  getUsuario(item:any){
    return  this.http.get(`${this.api}repartidores/`,item)
  }
  getUsuarioEspecifico(id:any){
    return  this.http.get(`${this.api}repartidores/${id}`)
  }
  getUsuarioPedido(item:any){
    return  this.http.get(`${this.api}usuarios/`,item)
  }
  getLavanderia(item:any){
    return  this.http.get(`${this.api}lavanderias/`,item)
  }

  getPedidos(item:any){
    return  this.http.get(`${this.api}pedidos_repartidor/${item}`)
  }
  
  login(item:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return  this.http.post(`${this.api}repartidoresLogin`,item, httpOptions)
  }

  cambiarStatus(id:any, item:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.put(`${this.api}repartidores_status/${id}`,item, httpOptions)
  }
  cambiarData(id:any, item:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.put(`${this.api}pedidos_lavanderia_datos/${id}`,item, httpOptions)
  }
  cambiarStatusLavanderia(id:any, item:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.put(`${this.api}pedidos_lavanderia/${id}`,item, httpOptions)
  }
  cambiarCoordenadas(id:any, item:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.put(`${this.api}repartidores_coords/${id}`,item, httpOptions)
  }
  cambiarStatusPedido(id:any, item:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.put(`${this.api}pedidos_repartidor_status/${id}`,item, httpOptions)
  }
  cambiarCostoPedido(id:any, item:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.put(`${this.api}pedidos_repartidor_costo/${id}`,item, httpOptions)
  }
  cambiarcontraseña(id:any, item:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.put(`${this.api}repartidores_cambiar_password/${id}`,item, httpOptions)
  }

  getLavanderias():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}lavanderias`,httpOptions)
  }

  getUsuarioCorreo(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}repartidores_correo/${id}`,httpOptions)
  }
  getServiciosLavanderia(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}servicioLavanderia/${id}`,httpOptions)
  }
  getServiciosTintoreria(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}servicioTintoreria/${id}`,httpOptions)
  }
  getServiciosPlanchado(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}servicioPlanchado/${id}`,httpOptions)
  }
  getServiciosOtro(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}servicioOtro/${id}`,httpOptions)
  }
  getServiciosOferta(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return  this.http.get(`${this.api}servicioOferta/${id}`,httpOptions)
  }






}
