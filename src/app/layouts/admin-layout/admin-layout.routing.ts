import { Routes } from '@angular/router';

import { EstadisticasComponent } from '../../estadisticas/estadisticas.component';
import { RegistroComponent } from '../../registro/registro.component';
import { ListadoComponent } from '../../listado/listado.component';
import { InicioComponent } from '../../inicio/inicio.component';
import { ResumenComponent } from '../../resumen/resumen.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'inicio',      component: InicioComponent },
    { path: 'estadisticas',      component: EstadisticasComponent },
    { path: 'registro',   component: RegistroComponent },
    { path: 'listado',     component: ListadoComponent },
    { path: 'resumen',     component: ResumenComponent },
];
