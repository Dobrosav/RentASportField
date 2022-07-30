import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SportObject } from 'src/models/sportobject';
import { SportObjectService } from '../sport-object.service';

@Component({
  selector: 'app-vlasnik',
  templateUrl: './vlasnik.component.html',
  styleUrls: ['./vlasnik.component.css']
})
export class VlasnikComponent implements OnInit {

  constructor(private s: SportObjectService, private r:Router, public translate:TranslateService) { 
    translate.setDefaultLang("sr-lat")
    if (sessionStorage.getItem("lang") == null)
      translate.use('sr-lat')
    else
      translate.use(sessionStorage.getItem("lang"))
    translate.addLangs(["sr-lat", "sr-cyr", "en"])
  }
  switchLang(lang: string): void {
    this.translate.use(lang);
    sessionStorage.setItem("lang", lang)
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("user")==null){
      alert("You did not log in");
      return;
    }
    this.link = this.r.url;
    this.korime = sessionStorage.getItem("user");
  }
  link:string;
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
