import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Booking } from 'src/models/booking';
import { BookingService } from '../booking.service';
import { UserService } from '../user.service';
import { User } from 'src/models/user';
import { SportObjectService } from '../sport-object.service';
import { SportObject } from 'src/models/sportobject';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-rekreativac',
  templateUrl: './rekreativac.component.html',
  styleUrls: ['./rekreativac.component.css']
})
export class RekreativacComponent implements OnInit {

  constructor(private r: Router, private sos: SportObjectService, private bos: BookingService, private user: UserService, public translate: TranslateService) {
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
    if (sessionStorage.getItem('user') == null) {
      alert("You did not log in");
      return;
    }
    this.user.getUsePerUsername(sessionStorage.getItem('user')).subscribe((data: User) => {
      this.u = data;
    })
    this.bos.getAllTermin().subscribe((data: Booking[]) => {
      this.bookings = data;

      this.bookings = this.bookings.filter(b => b.capacity > 0)
      this.bookings = this.bookings.filter(b => formatDate(b.date, 'yyyy-MM-dd', 'en_US') >= formatDate(new Date(), 'yyyy-MM-dd', 'en_US'))
    })
  }
  u: User;
  naziv: string;
  kategorija: string;
  date: string;
  timeoff: string;
  timeto: string;
  clicked: boolean[] = [false];
  message: string
  bookings: Booking[] = [];
  filter(): void {
    if (this.timeoff) {
      let sati = parseInt(this.timeoff.split(':')[0]) * 60
      let minutiod = parseInt(this.timeoff.split(':')[1])
      var ukupnood = sati + minutiod;
    }
    if (this.timeto) {
      let satido = parseInt(this.timeto.split(':')[0]) * 60
      let minutido = parseInt(this.timeto.split(':')[1])
      var ukupnodo = satido + minutido
    }
    if (ukupnodo && ukupnood) {
      if (ukupnodo < ukupnood) {
        alert("Nije dobro vreme")
        return;
      }
    }
    this.bos.getAllTermin().subscribe((data: Booking[]) => {
      this.bookings = data;
      if (this.naziv) {
        this.bookings = this.bookings.filter(b => b.naziv == this.naziv)
        this.bookings = this.bookings.filter(b => b.capacity > 0)
        this.bookings = this.bookings.filter(b => formatDate(b.date, 'yyyy-MM-dd', 'en_US') >= formatDate(new Date(), 'yyyy-MM-dd', 'en_US'))
      }
      if (this.kategorija) {
        this.bookings = this.bookings.filter(b => b.kategorija == this.kategorija)
        this.bookings = this.bookings.filter(b => b.capacity > 0)
        this.bookings = this.bookings.filter(b => formatDate(b.date, 'yyyy-MM-dd', 'en_US') >= formatDate(new Date(), 'yyyy-MM-dd', 'en_US'))
      }
      if (this.date) {
        this.bookings = this.bookings.filter(b => b.date == this.date)
        this.bookings = this.bookings.filter(b => b.capacity > 0)
        this.bookings = this.bookings.filter(b => formatDate(b.date, 'yyyy-MM-dd', 'en_US') >= formatDate(new Date(), 'yyyy-MM-dd', 'en_US'))
      }
      if (this.timeoff) {
        this.bookings = this.bookings.filter(b => (parseInt(b.timeoff.split(':')[0]) * 60 + parseInt(b.timeoff.split(':')[1])) >= ukupnood)
        this.bookings = this.bookings.filter(b => b.capacity > 0)
        this.bookings = this.bookings.filter(b => formatDate(b.date, 'yyyy-MM-dd', 'en_US') >= formatDate(new Date(), 'yyyy-MM-dd', 'en_US'))
      }
      if (this.timeto) {
        this.bookings = this.bookings.filter(b => (parseInt(b.timeto.split(':')[0]) * 60 + parseInt(b.timeto.split(':')[1])) <= ukupnodo)
        this.bookings = this.bookings.filter(b => b.capacity > 0)
        this.bookings = this.bookings.filter(b => formatDate(b.date, 'yyyy-MM-dd', 'en_US') >= formatDate(new Date(), 'yyyy-MM-dd', 'en_US'))
      }
    })
  }
  bookOpen(idterm: number): void {
    if (this.clicked[idterm - 1] == true)
      this.clicked[idterm - 1] = false;
    else
      this.clicked[idterm - 1] = true;

  }
  brOsoba: number;
  book: Booking;
  so: SportObject;
  reserve(idterm: number): void {
    if (this.brOsoba < 1) {
      this.message = "Niste uneli korektan broj osoba";
      return;
    }
    this.bos.getInfoByIdTerm(idterm).subscribe((data: Booking) => {
      this.book = data;
      if ((this.book.capacity - this.brOsoba) >= 0) {
        this.bos.update(idterm, this.book.capacity - this.brOsoba).subscribe(resp => {
          alert(resp['message'])
          location.reload()
        })
        this.sos.getById(this.book.objekat).subscribe((data: SportObject) => {
          this.so = data
          this.bos.pdf(this.u.ime, this.u.email, this.u.prezime, this.book.cena * this.brOsoba, this.brOsoba, this.book.date, this.book.timeoff, this.book.timeto, this.book.naziv, this.so.email, this.so.telefon, sessionStorage.getItem('user')).subscribe(resp => {
            alert(resp['message'])
            this.r.navigate(["/rekreativac"])
          })
        })

      }
      else {
        alert('nema mesta')
      }
    })
  }
  open(objekat: number, idterm: number): void {
    sessionStorage.setItem("objekat", objekat.toString())
    sessionStorage.setItem("idterm", idterm.toString())
    this.r.navigate(["/rekreativac/prikaz"])
  }
}
