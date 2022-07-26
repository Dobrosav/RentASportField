import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportObjectService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';
  getAllObjects() {
      return this.http.get(`${this.uri}/sportObject/getAllObjects`);
  }
  insertObject(id,naziv,kategorija,adresa,grad,telefon,email,korime){
    const data={
      id:id,
      naziv:naziv,
      kategorija:kategorija,
      adresa:adresa,
      grad:grad,
      telefon:telefon,
      email:email,
      korime:korime 
    }
    return this.http.post(`${this.uri}/sportObject/newObject`,data)
  }
  getAllObjectsOfOwner(korime){
    const data={
      korime:korime
    }
    return this.http.post(`${this.uri}/sportObject/getAllObjectsOfOwner`,data)
  }
  getById(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/sportObject/getById`,data)
  }
}
