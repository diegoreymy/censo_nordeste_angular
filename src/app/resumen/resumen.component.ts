import { Component, OnInit } from '@angular/core';
import { VenService } from '../services/ven.service';
import { Usuario } from '../services/models/usuario';
import { DatosPersonales } from '../services/models/datosPersonales';
import { DatosMigratoriosElectorales } from '../services/models/datosMigratoriosElectorales';
import { DatosEducativosLaborales } from '../services/models/datosEducativosLaborales';
import { DatosContacto } from '../services/models/datosContacto';
import { DatosComentariosSugerencias } from '../services/models/datosComentariosSugerencias';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  public usuarios: Array<Usuario> = [];
  public usuario: Usuario = {};
  public datosPersonales: DatosPersonales = {};
  public datosMigratoriosElectorales: DatosMigratoriosElectorales = {};
  public datosEducativosLaborales: DatosEducativosLaborales = {};
  public datosContacto: DatosContacto = {};
  public datosComentariosSugerencias: DatosComentariosSugerencias = {};

  public loading = true;
  public color = 'primary';
  public mode = 'indeterminate';

  public cantidadRegistrados = 0;
  public cantidadTrabajando = 0;
  public cantidadConRegistroConsular = 0;
  public cantidadConRegistroElectoral = 0;
  public cantidadEstudiando = 0;

  constructor(
    private venService: VenService
    ) { }

  ngOnInit() {
    this.contarRegistrados()
  }

  public contarRegistrados(){
    this.venService.getUsuarios().subscribe((data: any) =>{
      this.cantidadRegistrados = data.length;
      this.usuarios = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Usuario;
      })
      this.usuarios.map(usuario=> usuario.datosEducativosLaborales.trabaja === true ? this.cantidadTrabajando++ : this.cantidadTrabajando)
      // tslint:disable-next-line: max-line-length
      this.usuarios.map(usuario=> usuario.datosMigratoriosElectorales.registroConsular === true ? this.cantidadConRegistroConsular++ : this.cantidadConRegistroConsular)
      // tslint:disable-next-line: max-line-length
      this.usuarios.map(usuario=> usuario.datosMigratoriosElectorales.registroElectoral === true ? this.cantidadConRegistroElectoral++ : this.cantidadConRegistroElectoral)
      this.usuarios.map(usuario=> usuario.datosEducativosLaborales.estudia === true ? this.cantidadEstudiando++ : this.cantidadEstudiando)
      this.loading = false;
    }, error => {
      console.log(error)
    })
  }



}
