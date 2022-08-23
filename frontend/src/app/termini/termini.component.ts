import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Booking } from 'src/models/booking';
import { SportObject } from 'src/models/sportobject';
import { User } from 'src/models/user';
import Swal from 'sweetalert2';
import { BookingService } from '../booking.service';
import { SportObjectService } from '../sport-object.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-termini',
  templateUrl: './termini.component.html',
  styleUrls: ['./termini.component.css']
})
export class TerminiComponent implements OnInit {

  constructor(private sos: SportObjectService, private bos: BookingService, private us: UserService, public translate: TranslateService) {
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
      alert("You did not log in")
      return;
    }
    this.us.getUsePerUsername(sessionStorage.getItem("user")).subscribe((u: User) => {
      this.u = u;
    })
    this.sos.getById(parseInt(sessionStorage.getItem('objekat'))).subscribe((o: SportObject) => {
      this.objekat = o;
    })
  }
  maxId(): void {
    let max = 0;
    this.bookings.forEach((a) => {
      if (a.idterm > max)
        max = a.idterm;
    })
    this.max = max;
  }
  max: number;
  u: User;
  objekat: SportObject
  date: Date;
  timeoff: string;
  timeto: string;
  capacity: number;
  cena: number;
  message: string;
  bookings: Booking[] = [];
  insert(): void {
    if (!this.date) {
      this.message = "Niste uneli datum";
      return;
    }
    if (formatDate(this.date, 'yyyy-MM-dd', 'en_US') < formatDate(new Date(), 'yyyy-MM-dd', 'en_US')) {
      this.message = "Nije dozvoljen datum u proslosti"
      return;
    }
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
    if (!this.timeto || !this.timeoff) {
      this.message = "Niste uneli vreme"
      return;
    }
    if (ukupnodo && ukupnood) {
      if (ukupnodo < ukupnood) {
        Swal.fire("Error", "Nije dobro vreme", "warning")
        return;
      }
    }
    if (this.capacity < 0) {
      this.message = "Niste uneli kapacitet"
      return
    }
    if (this.cena < 0) {
      this.message = "Niste uneli cenu"
      return
    }
    this.bos.getAllTermin().subscribe((data: Booking[]) => {
      this.bookings = data;
      this.maxId();
      this.bos.insert(this.max + 1, this.date, this.timeoff, this.timeto, this.capacity, this.objekat.naziv, this.objekat.kategorija, this.cena, this.objekat.id).subscribe(resp => {
        if (resp['message'] == 'termin added') {
          Swal.fire({
            title: resp['message'],
            text: resp['message'],
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            location.reload()
          })
        }
        else Swal.fire("ERROR", "ERROR", "warning")
      })
    })
  }
}
