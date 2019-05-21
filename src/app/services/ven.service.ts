import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VenService {

  public usuariosUrl = 'https://ven-app-40809.firebaseio.com/usuarios.json'

  constructor(
    private http: HttpClient
    ) { }

  getDatosApiVenezuela() {

    const url = `https://restcountries.eu/rest/v2/name/venezuela`;

    return this.http.get(url);

  }

  getDatosApiBrasil() {

    const url = `https://restcountries.eu/rest/v2/name/brazil`;

    return this.http.get(url);

  }

  getUsuarios(){
    return this.http.get(this.usuariosUrl);
  }

  consultaCep(cep){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
  }

  guardarUsuarios(usuario){
    return this.http.post(this.usuariosUrl, usuario);
  }

}
