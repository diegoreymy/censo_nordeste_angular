import { DatosPersonales } from './datosPersonales';
import { DatosMigratorios } from './datosMigratorios';
import { DatosEducativosLaborales } from './datosEducativosLaborales';
import { DatosContactoEmergencia } from './datosContactoEmergencia';
import { DatosComentariosSugerencias } from './datosComentariosSugerencias';

export interface Usuario {
  datosPersonales?: DatosPersonales;
  datosMigratorios?: DatosMigratorios;
  datosEducativosLaborales?: DatosEducativosLaborales;
  datosContactoEmergencia?: DatosContactoEmergencia;
  datosComentariosSugerencias?: DatosComentariosSugerencias;

}
