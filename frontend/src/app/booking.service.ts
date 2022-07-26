import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }
  uri = 'http://localhost:4000';
  getAllTerminForObject(objekat){
    const data={
      objekat:objekat
    }
    return this.http.post(`${this.uri}/booking/getAllTerminForObjectgetAllTerminForObject`,data)
  }  
  update(idterm,brojOsoba){
    const data={
      idterm:idterm,
      brojOsoba:brojOsoba
    }
    return this.http.post(`${this.uri}/booking/update`,data)
  }
  getAllTermin(){
    return this.http.get(`${this.uri}/booking/getAllTermin`)
  }
  insert(idterm,date,timeoff,timeto,capacity,naziv,kategorija,cena,objekat){
    const data={
      idterm:idterm,
      date:date,
      timeoff:timeoff,
      timeto:timeto,
      capacity:capacity,
      naziv:naziv,
      kategorija:kategorija,
      cena:cena,
      objekat:objekat
    }
    return this.http.post(`${this.uri}/booking/insert`,data)
  }
}