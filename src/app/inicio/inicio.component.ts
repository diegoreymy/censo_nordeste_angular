import { Component, OnInit } from '@angular/core';
import { VenService } from '../services/ven.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public banderaBra: string;
  public datos: any[] = [];

  constructor(
    private venService: VenService
  ) { }

  ngOnInit() {
    this.getBanderaBra();
  }
  public getBanderaBra(){
    this.venService.getDatosApiBrasil().subscribe( (data: any) => {
      this.datos = data[0];
      this.banderaBra = data[0].flag;
    });
  }
}
