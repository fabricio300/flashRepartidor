import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalElementService } from '../../global-element.service';
import { NavParams } from '@ionic/angular';


import {Validators, FormBuilder, FormGroup,AbstractControl } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { AlertController, ModalController } from '@ionic/angular';
import { modalController } from '@ionic/core';

@Component({
  selector: 'modal-page',
  templateUrl: './contra.modal.html',
  styleUrls: ['./login.page.scss'],
})
export class ModalPage {
  private formEdicion: FormGroup;

  infoCampos={
    contrasenia:false,
    contrasenia2:false,
  }
  contraseniaValida='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$'

  constructor(
    private formBuilder: FormBuilder,
    private global:GlobalElementService,
    private alertacontroller: AlertController
  ) {

    this.formEdicion = this.formBuilder.group({
      contrasenia: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],
      contraseniaConfir:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],
    });

  }

  mostrarInfoCampo(tipo){   
    console.log("eci");

    switch(tipo){
      case 'contrasenia': if(this.infoCampos.contrasenia==true){ this.infoCampos.contrasenia=false }else {this.infoCampos.contrasenia=true}
      break;
      case 'contrasenia2': if(this.infoCampos.contrasenia2==true){ this.infoCampos.contrasenia2=false }else {this.infoCampos.contrasenia2=true}
      break;
    }  
  }
  back() {
    modalController.dismiss()
  }
  Cambiar() {
    this.global.cambiarcontraseña(localStorage.getItem('id'),{contraseña:this.formEdicion.get('contrasenia').value,}).subscribe(response=>{
      console.log("response",response);
      
      this.alerta()
      modalController.dismiss()
    })

  }
  async alerta() {
    const alerta=await this.alertacontroller.create({
      header:'Error',
      subHeader:'Correo o contraseña incorrectos',
      message:'vuelva a intentar',
      buttons:['Aceptar']

  })

  await alerta.present()
  }

}


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  actualRegitrar=0
  private formRegistro : FormGroup;
  private formInicio:FormGroup;
  private formEdicion: FormGroup;

  infoCampos={
    nombre:false,
    correo:false,
    contrasenia:false,
    contrasenia2:false,
    telefono:false,
    apellidos:false,
    matricula:false
  }

  infoCampoInicio={
    nombre:false,
    contrasenia:false,
  }

  emailValido='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
  nombreValido='[a-zA-ZÀ-ÿ ]{3,50}'
  apellidosValidos='[a-zA-ZÀ-ÿ ]{3,48}'
  contraseniaValida='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$'
  numeroValido='[0-9]{10}'
  placaValida='[A-Z]{3}[-][0-9]{2}[-][0-9]{2}'

  anterio:any
  parametros={
    edicion:"false",
    id:0
  };
  repartidor:any;
  
  constructor(
    private router: Router,
    private global:GlobalElementService,
    private formBuilder: FormBuilder,
    private alertacontroller: AlertController,
    private route: ActivatedRoute,
    public modalController: ModalController
  ) {
    this.parametros={
      edicion:"false",
      id:0
    };
    if(localStorage.getItem('recarga') == 'true' && localStorage.getItem('editar')==='false'){
      this.cosa()
    }

    this.formRegistro = this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.nombreValido),
        
      ])],
      contrasenia: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],
      contraseniaConfir:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],
      telefono: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.numeroValido)
      ])],
      correo: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.emailValido)])
      ],
      apellidos:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.apellidosValidos)
      ])],
      matricula:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.placaValida)
      ])]
    });


    this.formInicio=this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailValido),
      ])],
      contrasenia: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],
    });

    this.formEdicion = this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.nombreValido),
        
      ])],
      telefono: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.numeroValido)
      ])],
      correo: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.emailValido)])
      ],
      apellidos:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.apellidosValidos)
      ])],
      matricula:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.placaValida)
      ])]
    });
   
  }
  cosa(){
    localStorage.setItem('editar','true')
    location.reload();
   
    console.log("quita todo ostia");
    
    
  }
  antes(){
    console.log("1");
    
    this.verPart('part4')
    this.route.queryParams.subscribe(params => {
      if(JSON.stringify(params).length > 2){
        this.parametros = JSON.parse(params.special);
        console.log("ACABA 1");
        this.verPart('part4')
        this.empezar()
      }
    })
  }
  empezar(){
    console.log("2");
    this.verPart('part4')
        if(this.parametros.edicion=="true"){
          console.log("se editara",this.parametros);
          this.ocultarPart('part2')
          this.verPart('part4')
          this.actualRegitrar=0;
          this.global.getUsuarioEspecifico(this.parametros.id).subscribe((response:any)=>{
            this.repartidor = response
            console.log(response);
            
            this.formEdicion = this.formBuilder.group({
              nombre: [response.nombres, Validators.compose([
                Validators.required,
                Validators.pattern(this.nombreValido),
                
              ])],
              telefono: [response.telefono,Validators.compose([
                Validators.required,
                Validators.pattern(this.numeroValido)
              ])],
              correo: [response.correo_electronico,Validators.compose([
                Validators.required,
                Validators.pattern(this.emailValido)])
              ],
              apellidos:[response.apellidos,Validators.compose([
                Validators.required,
                Validators.pattern(this.apellidosValidos)
              ])],
              matricula:[response.matricula,Validators.compose([
                Validators.required,
                Validators.pattern(this.placaValida)
              ])]
            });
            this.imagenes=[]
            console.log("cosa",JSON.parse(response.foto_perfil));
            let imagenlista= JSON.parse(response.foto_perfil) 
            this.imagenes=imagenlista
        }
          ) 
      }
      this.verPart('part4')
  }
  guardarEdit(){
    let item={
      nombres:this.formEdicion.get('nombre').value,
      apellidos:this.formEdicion.get('apellidos').value,
      correo_electronico: this.formEdicion.get('correo').value,
      telefono: this.formEdicion.get('telefono').value,
      matricula: this.formEdicion.get('matricula').value,
      foto_perfil: JSON.stringify(this.imagenes),
    }


    this.global.editarUsuario(localStorage.getItem('id') ,item).subscribe((response:any)=>{
      console.log("editado");
      localStorage.setItem('primera','true')
      console.log(response);      
      localStorage.setItem('id',response.id)
      this.iniciar()
    })


  }
  poner(){
    console.log("3");
    console.log("33",this.repartidor.nombre);
    
    this.formRegistro = this.formBuilder.group({
      nombre: [this.repartidor.nombre, Validators.compose([
        Validators.required,
        Validators.pattern(this.nombreValido),
        
      ])],
      contrasenia: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],
      contraseniaConfir:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.contraseniaValida)
      ])],
      telefono: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.numeroValido)
      ])],
      correo: ['',Validators.compose([
        Validators.required,
        Validators.pattern(this.emailValido)])
      ],
      apellidos:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.apellidosValidos)
      ])],
      matricula:['',Validators.compose([
        Validators.required,
        Validators.pattern(this.placaValida)
      ])]
    });
  }
  ionViewWillEnter() {
    this.actualRegitrar=0;
    if(localStorage.getItem('secion')== null) {
      this.verPart('part1')
      this.ocultarPart('part4')
      this.actualRegitrar=0;
    }
  }

  ngOnInit() {

    if(localStorage.getItem('secion')== 'true' || localStorage.getItem('editar')==='false'){
      console.log("SE INICIA SESION");
      this.iniciar()
    }
    if(localStorage.getItem('editar')==='false'){
      //this.cosa()
    }
    this.antes()
    this.ocultarPart('part2')
    this.ocultarPart('part3')
    this.ocultarPart('part4')
  
  }


  goOP(id){
      this.verPart(id)
      this.ocultarPart('part1')
  }

  retornar(id){
      this.ocultarPart(id)
      this.verPart('part1')
  }

  async cambiarContrasenia() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  

  }

  verPart(id){
    document.getElementById(id).style.transition="0.5s"
    document.getElementById(id).style.height='100%'
  }

  ocultarPart(id){
    document.getElementById(id).style.transition="0.5s"
    document.getElementById(id).style.height='0px'
  }



  iniciar(){
      localStorage.setItem('secion','true')
      this.global.status_de_secion=true
      this.router.navigate(['/inicio'])


  }
 
  next(){
    this.actualRegitrar=1
    
    this.mostrarInfoCampo(this.anterio)
  }

  back(){
    this.actualRegitrar=0
  }


  mostrarInfoCampo(tipo){   
    console.log("eci");
    if(this.anterio!=null && this.anterio!=tipo){
      switch(this.anterio){
        case 'correo': this.infoCampos.correo=false 
        break;
        case 'telefono': this.infoCampos.telefono=false
        break;
        case 'contrasenia':  this.infoCampos.contrasenia=false 
        break;
        case 'contrasenia2': this.infoCampos.contrasenia2=false 
        break;
        case 'nombre': this.infoCampos.nombre=false 
        break;
        case 'apellidos': this.infoCampos.apellidos=false 
        break;
        case 'matricula': this.infoCampos.matricula=false 
        break;
      } 
    }

    switch(tipo){
      case 'correo': if(this.infoCampos.correo==true){ this.infoCampos.correo=false }else {this.infoCampos.correo=true}
      break;
      case 'telefono': if(this.infoCampos.telefono==true){ this.infoCampos.telefono=false }else {this.infoCampos.telefono=true}
      break;
      case 'contrasenia': if(this.infoCampos.contrasenia==true){ this.infoCampos.contrasenia=false }else {this.infoCampos.contrasenia=true}
      break;
      case 'contrasenia2': if(this.infoCampos.contrasenia2==true){ this.infoCampos.contrasenia2=false }else {this.infoCampos.contrasenia2=true}
      break;
      case 'nombre': if(this.infoCampos.nombre==true){ this.infoCampos.nombre=false }else {this.infoCampos.nombre=true}
      break;
      case 'apellidos': if(this.infoCampos.apellidos==true){ this.infoCampos.apellidos=false }else {this.infoCampos.apellidos=true}
      break;
      case 'matricula': if(this.infoCampos.matricula==true){ this.infoCampos.matricula=false }else {this.infoCampos.matricula=true}
      break;
    }  
    
    this.anterio=tipo
  }

  mostrarInfoCampoInicio(tipo){   
    console.log("eci");
    if(this.anterio!=null && this.anterio!=tipo){
      switch(this.anterio){
        case 'contrasenia':  this.infoCampoInicio.contrasenia=false 
        break;
        case 'nombre': this.infoCampoInicio.nombre=false 
        break;
      } 
    }

    switch(tipo){ 
      case 'contrasenia': if(this.infoCampoInicio.contrasenia==true){ this.infoCampoInicio.contrasenia=false }else {this.infoCampoInicio.contrasenia=true}
      break;
      case 'nombre': if(this.infoCampoInicio.nombre==true){ this.infoCampoInicio.nombre=false }else {this.infoCampoInicio.nombre=true}
      break;
    }  
    
    this.anterio=tipo
  }


  irARecuperarPassword(){
    this.router.navigate(['/resetar'])
  }




  Registrar(){
    let item={
      nombres:this.formRegistro.get('nombre').value,
      apellidos:this.formRegistro.get('apellidos').value,
      correo_electronico: this.formRegistro.get('correo').value,
      contraseña: this.formRegistro.get('contrasenia').value,
      telefono: this.formRegistro.get('telefono').value,
      matricula: this.formRegistro.get('matricula').value,
      foto_perfil: JSON.stringify(this.imagenes),
    }


    this.global.registrar(item).subscribe(response=>{
      console.log("registrado");
      localStorage.setItem('primera','true')
      console.log(response);      
      localStorage.setItem('id',response.id)
      this.iniciar()
    })

  }



  iniciarSesion(){
    let item={
      correo_electronico:this.formInicio.get('nombre').value,
      contraseña:this.formInicio.get('contrasenia').value
    }

    this.global.login(item).subscribe(response=>{
      console.log(response);
      localStorage.setItem('id',response[0].id)
      this.iniciar()
    },error=>{
      console.log("error");
      this.verAlerta()
    })


    
  }


  async verAlerta(){
    const alerta=await this.alertacontroller.create({
      header:'Error',
      subHeader:'Correo o contraseña incorrectos',
      message:'vuelva a intentar',
      buttons:['Aceptar']

  })

  await alerta.present()
  }
  imagenes=[]
  base64textString:any
  idImagen=0
  handleFileSelect(evt){
    console.log(evt);
    
    var files = evt.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();
  
      reader.onload =this._handleReaderLoaded.bind(this);
  
      reader.readAsBinaryString(file);
  }
  
  }
  
  
  
  _handleReaderLoaded(readerEvt) {
          var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
         // console.log(btoa(binaryString));
  
          console.log("otro: \n",this.base64textString);
  
        this.imagenes.push({id:this.idImagen, imagen:'data:image/jpeg;base64,'+this.base64textString})
        this.idImagen=this.idImagen+1
         //this.imagen64='data:image/jpeg;base64,'+this.base64textString
  }
  
borrarImagen(id:any){
  for (let index = 0; index < this.imagenes.length; index++) {
        if(this.imagenes[index].id==id){
          this.imagenes.splice(index,1)
        }
    
  }
}

regresarInicio() {
  localStorage.setItem('editar','false')
  this.router.navigate(['/inicio']);
}

async presentAlertPrompt() {
  const alert = await this.alertacontroller.create({
    header: 'Prompt!',
    inputs: [
      {
        name: 'name1',
        type: 'text',
        placeholder: 'Placeholder 1'
      },
      {
        name: 'name2',
        type: 'text',
        id: 'name2-id',
        value: 'hello',
        placeholder: 'Placeholder 2'
      },
      {
        name: 'name3',
        value: 'http://ionicframework.com',
        type: 'url',
        placeholder: 'Favorite site ever'
      },
      // input date with min & max
      {
        name: 'name4',
        type: 'date',
        min: '2017-03-01',
        max: '2018-01-12'
      },
      // input date without min nor max
      {
        name: 'name5',
        type: 'date'
      },
      {
        name: 'name6',
        type: 'number',
        min: -5,
        max: 10
      },
      {
        name: 'name7',
        type: 'number'
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
        handler: () => {
          console.log('Confirm Ok');
        }
      }
    ]
  });

  await alert.present();
}

}
