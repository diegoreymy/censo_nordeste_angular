import { Component, OnInit } from '@angular/core';
import { VenService } from '../services/ven.service';
import { Usuario } from '../services/models/usuario';
import { DatosPersonales } from '../services/models/datosPersonales';
import { DatosMigratorios } from '../services/models/datosMigratorios';
import { DatosEducativosLaborales } from '../services/models/datosEducativosLaborales';
import { DatosContactoEmergencia } from '../services/models/datosContactoEmergencia';
import { DatosComentariosSugerencias } from '../services/models/datosComentariosSugerencias';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { NgForm } from '@angular/forms';

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
    cedula: true,
    pasaporte: true,
    cep: '',
  };
  public datosMigratorios: DatosMigratorios = {};
  public datosEducativosLaborales: DatosEducativosLaborales = {};
  public datosContactoEmergencia: DatosContactoEmergencia = {};
  public datosComentariosSugerencias: DatosComentariosSugerencias = {};

// tslint:disable-next-line: max-line-length
  public areasLaboralEstudio = ['Agricultura', 'Alimentación', 'Comercio', 'Construcción', 'Educación', 'Hotelería', 'Turismo', 'Industrias químicas', 'Ingenieria mecánica y eléctria', 'Minería', 'Petroleo y producción de gas', 'Telecomunicaciones', 'Servicios de salud', 'Servicios financieros', 'Servicios públicos', 'Textiles', 'Transporte'];

// tslint:disable-next-line: max-line-length
  public listaDeParentescos = ['Padre/Madre', 'Hijo (a)', 'Hermano (a)', 'Esposo (a)', 'Tío (a)', 'Primo (a)', 'Amigo (a)', 'Yerno (a)', 'Suegro (a)', 'Abuelo (a)', 'Nieto (a)', 'Cuñado (a)', 'Sobrino (a)'];

  public error = false;

  public mensaje: any = {
    'texto': '',
    'clase': ''
  };

  public alert = false;

  constructor(
    private venService: VenService
  ){ }

  ngOnInit() {
  }

  public guardarUsuarios(formulario: NgForm){
    this.usuario.datosPersonales = this.datosPersonales;
    this.usuario.datosMigratorios = this.datosMigratorios;
    this.usuario.datosEducativosLaborales = this.datosEducativosLaborales;
    this.usuario.datosContactoEmergencia = this.datosContactoEmergencia;
    this.usuario.datosComentariosSugerencias = this.datosComentariosSugerencias;

    this.venService.guardarUsuarios(this.usuario).subscribe((data: any) =>{
      this.error = false;
      formulario.resetForm();
    }, error => {
      this.error = true;
    })
  }

  public consultaCep(event){
    if(event.target.value.length >= 8 ){
      this.venService.consultaCep(event.target.value).subscribe((data: any) =>{
        if(data.logradouro === undefined || data.bairro === undefined || data.localidade === undefined || data.uf === undefined){
          this.datosPersonales.complemento = `CEP inválido`
        } else{
          this.datosPersonales.complemento = `${data.logradouro}, ${data.bairro} - ${data.localidade} - ${data.uf}`;
        }
      }, error => {
        this.datosPersonales.complemento = `CEP inválido`;
        this.error = true;
      })
    }else{
        this.datosPersonales.complemento = ``;
    }
  }

  public mensajes( msj: string, tipo:string ){
    this.mensaje.texto = msj;
    this.mensaje.clase = tipo;

  }

}
