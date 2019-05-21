import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { EstadisticasComponent } from '../../estadisticas/estadisticas.component';
import { RegistroComponent } from '../../registro/registro.component';
import { ListadoComponent } from '../../listado/listado.component';
import { InicioComponent } from '../../inicio/inicio.component';
import { ResumenComponent } from '../../resumen/resumen.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  declarations: [
    EstadisticasComponent,
    RegistroComponent,
    ListadoComponent,
    InicioComponent,
    ResumenComponent,
  ]
})

export class AdminLayoutModule {}
