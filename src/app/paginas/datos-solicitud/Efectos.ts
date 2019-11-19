

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

    mostrarRuta() {
        document.getElementById('RUTA').style.transition="0.5s"
        document.getElementById('RUTA').style.marginLeft="0px"
    }

    ocultarRuta() {
        document.getElementById('RUTA').style.marginLeft="-100%"
    }
    mostrarServicios() {
        document.getElementById('SERVICIOS').style.transition="0.5s"
        document.getElementById('SERVICIOS').style.marginLeft="0px"
    }

    ocultarServicios() {
        document.getElementById('SERVICIOS').style.marginLeft="-100%"
    }

}