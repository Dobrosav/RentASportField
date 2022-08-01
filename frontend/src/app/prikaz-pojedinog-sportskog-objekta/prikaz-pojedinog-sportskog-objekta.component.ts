import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as L from 'leaflet'
import { Booking } from 'src/models/booking';
import { SportObject } from 'src/models/sportobject';
import { User } from 'src/models/user';
import { BookingService } from '../booking.service';
import { SportObjectService } from '../sport-object.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-prikaz-pojedinog-sportskog-objekta',
  templateUrl: './prikaz-pojedinog-sportskog-objekta.component.html',
  styleUrls: ['./prikaz-pojedinog-sportskog-objekta.component.css']
})
export class PrikazPojedinogSportskogObjektaComponent implements OnInit {
  private icon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 0],
      iconUrl: 'marker-icon.png'
    })
  };
  constructor(private bos: BookingService, private sos: SportObjectService, private user:UserService, public translate: TranslateService) {
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
  private map
  initmap(lat, lon): void {
    this.map = L.map('map', {
      center: [lat, lon],
      zoom: 11
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
  idterm: number
  clicked: boolean;
  ngOnInit(): void {
    console.log(sessionStorage.getItem('idterm'))
    if (sessionStorage.getItem('user') == null) {
      alert("You did not log in");
      return;
    }
    this.user.getUsePerUsername(sessionStorage.getItem('user')).subscribe((data: User) => {
      this.u = data;
    })
    this.sos.getById(sessionStorage.getItem('objekat')).subscribe((data: SportObject) => {
      this.objekat = data;
    })
    this.idterm = parseInt(sessionStorage.getItem('idterm'));
    this.sos.getById(sessionStorage.getItem('objekat')).subscribe((data: SportObject) => {
      this.objekat = data;
      this.bos.getCoordinates(this.objekat.adresa, this.objekat.grad).subscribe(resp => {
        let lat = parseFloat(resp[0]['lat'])
        let lon = parseFloat(resp[0]['lon'])
        this.initmap(lat, lon)
        var marker = L.marker([lat, lon], this.icon).addTo(this.map);
      })
    })
  }
  objekat: SportObject
  brOsoba:number
  open(): void {
    if (this.clicked)
      this.clicked = false
    else
      this.clicked = true
  }
  message:string;
  u:User;
  book:Booking;
  reserve(): void {
    if (this.brOsoba < 1) {
      this.message = "Niste uneli korektan broj osoba";
      return;
    }
    this.bos.getInfoByIdTerm(sessionStorage.getItem('idterm')).subscribe((data: Booking) => {
      this.book = data;

      if ((this.book.capacity - this.brOsoba) >= 0) {
        this.bos.update(sessionStorage.getItem('idterm'), this.book.capacity - this.brOsoba).subscribe(resp => {
          alert(resp['message'])
          location.reload()
        })
        this.sos.getById(this.book.objekat).subscribe((data: SportObject) => {
          this.objekat = data
          this.bos.pdf(this.u.ime, this.u.email, this.u.prezime, this.book.cena * this.brOsoba, this.brOsoba, this.book.date, this.book.timeoff, this.book.timeto, this.book.naziv, this.objekat.email, this.objekat.telefon, sessionStorage.getItem('user')).subscribe(resp => {
            alert(resp['message'])
          })
        })

      }
      else {
        alert('nema mesta')
      }
    })
  }
}
