import { Component, OnInit } from '@angular/core';
import { VenService } from '../../services/ven.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/inicio', title: 'Inicio',  icon: 'house', class: '' },
    { path: '/registro', title: 'Registro',  icon: 'person', class: '' },
    { path: '/listado', title: 'Listado',  icon: 'content_paste', class: '' },
    { path: '/resumen', title: 'Resumen',  icon: 'library_books', class: '' },
   // { path: '/estadisticas', title: 'Estadísticas',  icon: 'dashboard', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public datos: any[] = [];
  public banderaVen: string;

  constructor(
    private venService: VenService
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getBanderaVen();
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  public getBanderaVen(){
    this.venService.getDatosApiVenezuela().subscribe( (data: any) => {
      this.datos = data[0];
      this.banderaVen = data[0].flag;
    });
  }
}
