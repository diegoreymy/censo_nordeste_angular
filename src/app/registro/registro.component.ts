import { Component, OnInit } from '@angular/core';
import { VenService } from '../services/ven.service';
import { Usuario } from '../services/models/usuario';
import { DatosPersonales } from '../services/models/datosPersonales';
import { DatosMigratoriosElectorales } from '../services/models/datosMigratoriosElectorales';
import { DatosEducativosLaborales } from '../services/models/datosEducativosLaborales';
import { DatosContacto } from '../services/models/datosContacto';
import { DatosComentariosSugerencias } from '../services/models/datosComentariosSugerencias';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class RegistroComponent implements OnInit {

  public usuario: Usuario = {};
  public datosPersonales: DatosPersonales = {
    hijosMenores: false,
    paisDeNacimiento: 'Venezuela'
  };
  public datosMigratoriosElectorales: DatosMigratoriosElectorales = {
    registroConsular: false,
    rne: false,
    cedula: false,
    pasaporte: false,
    registroElectoral: false
  };
  public datosEducativosLaborales: DatosEducativosLaborales = {
    trabaja: false,
    estudia: false,
    desempleado: false,
  };
  public datosContacto: DatosContacto = {};
  public datosComentariosSugerencias: DatosComentariosSugerencias = {};

// tslint:disable-next-line: max-line-length
  public areasLaboralEstudio = ['Agricultura', 'Alimentación', 'Comercio', 'Construcción', 'Educación', 'Hotelería', 'Turismo', 'Industrias químicas', 'Ingenieria mecánica y eléctria', 'Minería', 'Petroleo y producción de gas', 'Telecomunicaciones', 'Servicios de salud', 'Servicios financieros', 'Servicios públicos', 'Textiles', 'Transporte'];

// tslint:disable-next-line: max-line-length
  public listaDeParentescos = ['Padre/Madre', 'Hijo (a)', 'Hermano (a)', 'Esposo (a)', 'Tío (a)', 'Primo (a)', 'Amigo (a)', 'Yerno (a)', 'Suegro (a)', 'Abuelo (a)', 'Nieto (a)', 'Cuñado (a)', 'Sobrino (a)'];

  public error = false;
  public estados = [];
  public ciudades = [];
  public alert = false;
  public cepIsValid = false;

  constructor(
    private venService: VenService
  ){ }

  ngOnInit() {
    this.consultaEstadosVenezuela();
  }

  public guardarUsuarios(formulario: NgForm){

    if( !formulario.valid ) {
      const mensaje = 'Hay campos obligatorios que necesita llenar, por favor complete el formulario'
      this.showNotificationError('top', 'right', mensaje)
      return false;
    }

    this.usuario.datosPersonales = this.datosPersonales;
    this.usuario.datosMigratoriosElectorales = this.datosMigratoriosElectorales;
    this.usuario.datosEducativosLaborales = this.datosEducativosLaborales;
    this.usuario.datosContacto = this.datosContacto;
    this.usuario.datosComentariosSugerencias = this.datosComentariosSugerencias;

    this.venService.guardarUsuarios(this.usuario).then((data: any) =>{
      this.error = false;
      const mensaje = 'Muy bien! se han guardado los datos correctamente.'
      this.showNotificationSuccess('top', 'right', mensaje)
      formulario.resetForm();
    }, error => {
      this.error = true;
      const mensaje = 'Error! no se han podido guardar los datos, intente nuevamente o póngase en contacto con el administrador del portal.'
      this.showNotificationError('top', 'right', mensaje);
    })
  }

  public consultaCep(event){
    if(event.target.value.length >= 8 ){
      this.cepIsValid = true;
      this.venService.consultaCep(event.target.value).subscribe((data: any) =>{
        if(data.logradouro === undefined || data.bairro === undefined || data.localidade === undefined || data.uf === undefined){
          this.error = true;
        } else{
          this.datosContacto.logradouroResidencia = data.logradouro;
          this.datosContacto.barrioResidencia = data.bairro;
          this.datosContacto.ciudadResidencia = data.localidade;
          this.datosContacto.estadoResidencia = data.uf;
        }
      }, error => {
        this.error = true;
      })
    } else{
      this.error = true;
      this.cepIsValid = false;
      this.datosContacto.logradouroResidencia = '';
      this.datosContacto.barrioResidencia = '';
      this.datosContacto.ciudadResidencia = '';
      this.datosContacto.estadoResidencia = '';
    }
  }

  public consultaEstadosVenezuela(){
    this.venService.getDatosApiEstadosVenezuela().subscribe((data: any) =>{
      this.estados = data;
    })
  }

  public consultaMunicipioVenezuela(event){
    const estadoSeleccionado = event.source.value;
    if(estadoSeleccionado !== 'Distrito Capital'){
      this.ciudades = this.estados.filter(estado => estado.estado === estadoSeleccionado)
      this.ciudades = this.ciudades[0].ciudades;
    }else{
      this.ciudades = this.estados.filter(estado => estado.estado === estadoSeleccionado)
      this.ciudades = this.ciudades[0].municipios[0].parroquias;
    }
  }

  public showNotificationSuccess(from, align, mensaje){

    $.notify({
        icon: 'add_alert',
        message: mensaje
      },{
        type: 'success',
        timer: 4000,
        placement: {
        from: from,
        align: align
      }
    });
  }

  public showNotificationError(from, align, mensaje){

    $.notify({
        icon: 'add_alert',
        message: mensaje
      },{
        type: 'danger',
        timer: 4000,
        placement: {
        from: from,
        align: align
      }
    });
  }
}
