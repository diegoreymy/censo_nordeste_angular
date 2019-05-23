import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VenService {

  public usuariosUrl = 'https://ven-app-40809.firebaseio.com/usuarios.json'

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
    ) { }

  getDatosApiVenezuela() {

    const url = `https://restcountries.eu/rest/v2/name/venezuela`;

    return this.http.get(url);

  }

  getDatosApiEstadosVenezuela() {

    const url = '/assets/json/venezuela.json';

    return this.http.get(url);

  }

  getDatosApiBrasil() {

    const url = `https://restcountries.eu/rest/v2/name/brazil`;

    return this.http.get(url);

  }

  getUsuarios(){
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  consultaCep(cep){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
  }

  guardarUsuarios(usuario){
    return this.firestore.collection('usuarios').add(usuario);
  }
}
