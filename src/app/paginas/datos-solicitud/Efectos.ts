

export class Efectos{
    stausPedido=0

    
    
     
    constructor(){

    }


    mostrarDatos(){
        document.getElementById('DATOS').style.transition="0.5s"
        document.getElementById('DATOS').style.marginLeft="0px"
        document.getElementById('DATOS1').scrollIntoView(true)
    }

    ocultarDatos(){
        document.getElementById('DATOS').style.marginLeft="-100%"
    }

}