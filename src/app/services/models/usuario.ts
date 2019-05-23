import { DatosPersonales } from './datosPersonales';
import { DatosMigratoriosElectorales } from './datosMigratoriosElectorales';
import { DatosEducativosLaborales } from './datosEducativosLaborales';
import { DatosContacto } from './datosContacto';
import { DatosComentariosSugerencias } from './datosComentariosSugerencias';

export interface Usuario {
  datosPersonales?: DatosPersonales;
  datosMigratoriosElectorales?: DatosMigratoriosElectorales;
  datosEducativosLaborales?: DatosEducativosLaborales;
  datosContacto?: DatosContacto;
  datosComentariosSugerencias?: DatosComentariosSugerencias;

}
