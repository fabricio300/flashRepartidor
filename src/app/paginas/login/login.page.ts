import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  tipoDeLogin=0;


  constructor() { }

  ngOnInit() {
  }


  ver(tipo){
    this.tipoDeLogin=tipo
  }

  cancelar(){
    this.tipoDeLogin=0
  }

}
