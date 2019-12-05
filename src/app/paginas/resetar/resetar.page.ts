import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalElementService } from 'src/app/global-element.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-resetar',
  templateUrl: './resetar.page.html',
  styleUrls: ['./resetar.page.scss'],
})
export class ResetarPage implements OnInit {

  private formInicio:FormGroup

  infoCampoInicio={
    nombre:false,
  }

  anterio:any
  emailValido='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'

  constructor(
    private router: Router,
    private global:GlobalElementService,
    private formBuilder: FormBuilder,
    private alertacontroller: AlertController,
  ) {
    this.formInicio=this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailValido),
      ])]
    });
   }

  ngOnInit() {
  }

  mostrarInfoCampoInicio(tipo){   
    console.log("eci");
    if(this.anterio!=null && this.anterio!=tipo){
      switch(this.anterio){
        case 'nombre': this.infoCampoInicio.nombre=false 
        break;
      } 
    }
    switch(tipo){
      case 'nombre': if(this.infoCampoInicio.nombre==true){ this.infoCampoInicio.nombre=false }else {this.infoCampoInicio.nombre=true}
      break;
    }  
    
    this.anterio=tipo
  }

  resetarPass(){
    console.log(this.randomString(15, '###aA!'));
    let pass = this.randomString(15, '##aA!')
    console.log(pass);
    
   this.global.getUsuarioCorreo(this.formInicio.get('nombre').value).subscribe(response=>{
      console.log("res:", response);
      if(response.length==0){
        alert("El correo no esta registrado")
      }
      this.global.cambiarcontraseña(response[0].id,{contraseña:pass}).subscribe(response=>{
        this.global.restablecer({email:this.formInicio.get('nombre').value,password:pass}).subscribe(response=>{
          alert("Revise su bandeja")
          this.router.navigate(['/'])
        })
      })
    }),error => {
      console.log("err", error);
    }

  }

  retornar(){
    this.router.navigate(['/'])
  }

randomString(length, chars) {
  var mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789#?!@$\\';
  if (chars.indexOf('!') > -1) mask += '#?!@$%^&*-\\';
  var result = '';
  for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}

}
