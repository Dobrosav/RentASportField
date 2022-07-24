import { Component, OnInit } from '@angular/core';
import { SportObject } from 'src/models/sportobject';
import { SportObjectService } from '../sport-object.service';

@Component({
  selector: 'app-vlasnik',
  templateUrl: './vlasnik.component.html',
  styleUrls: ['./vlasnik.component.css']
})
export class VlasnikComponent implements OnInit {

  constructor(private s: SportObjectService) { }

  ngOnInit(): void {
    this.korime = sessionStorage.getItem("user");
  }

  naziv: string;
  kategorija: string;
  adresa: string;
  grad: string;
  telefon: string;
  email: string;
  korime: string;
  objekti: SportObject[] = [];
  max: number;
  poruka: string;
  maxId(): void {
    let max = 0;
    this.objekti.forEach((a) => {
      if (a.id > max)
        max = a.id;
    })
    this.max = max;
  }
  check(): boolean {
    if (this.naziv.length > 3 && this.kategorija != "" && this.adresa.length > 10 && this.grad.length > 2 && this.email.length > 10 && this.telefon.length > 5)
      return true;
    return false;
  }
  dodajObjekat(): void {
    if (!this.check()) {
      this.poruka = "bad data!";
      return;
    }
    this.s.getAllObjects().subscribe((data: SportObject[]) => {
      this.objekti = data;
      this.maxId()
      this.s.insertObject(this.max + 1, this.naziv, this.kategorija, this.adresa, this.grad, this.telefon, this.email, this.korime).subscribe(resp => {
        if (resp['message'] == 'object added') {
          alert("ok")
          location.reload()
        }
        else alert("ERROR!")
      })
    })

  }
}
