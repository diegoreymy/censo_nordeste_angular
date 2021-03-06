import { Component, OnInit } from '@angular/core';
import { VenService } from '../services/ven.service';
import { Usuario } from '../services/models/usuario';
import { DatosPersonales } from '../services/models/datosPersonales';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public usuarios: Array<Usuario> = [];
  public datosPersonales: DatosPersonales = {};

  loading = true;
  color = 'primary';
  mode = 'indeterminate';

  constructor(private venService: VenService) {
    this.loading = true;
   }

  ngOnInit() {
    this.getUsuarios();
  }

  public getUsuarios(){
    this.venService.getUsuarios().subscribe( (data: any) => {
      this.usuarios = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Usuario;
      })
      this.loading = false;
    } )
  }

}
