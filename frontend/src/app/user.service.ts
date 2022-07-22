import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

  uri = 'http://localhost:4000';
  login(username, password){
    const data={
      korime: username,
      lozinka: password
    }
    return this.http.post(`${this.uri}/user/login`, data);
  }
  register(ime,prezime,korime,lozinka,grad,datumRodjenja,email,telefon,tip){
    const data={
      ime:ime,
      prezime:prezime,
      korime:korime,
      lozinka:lozinka,
      grad:grad,
      datumRodjenja:datumRodjenja,
      email:email,
      telefon:telefon,
      tip:tip,
      valid:false
    } 
    return this.http.post(`${this.uri}/user/register`, data)
   }
   getUsers(){
    return this.http.get(`${this.uri}/user/kime`);
  }
}
