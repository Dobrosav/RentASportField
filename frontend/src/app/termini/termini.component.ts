import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/models/booking';
import { SportObject } from 'src/models/sportobject';
import { BookingService } from '../booking.service';
import { SportObjectService } from '../sport-object.service';

@Component({
  selector: 'app-termini',
  templateUrl: './termini.component.html',
  styleUrls: ['./termini.component.css']
})
export class TerminiComponent implements OnInit {

  constructor(private sos: SportObjectService, private bos: BookingService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user') == null) {
      alert("You did not log in")
      return;
    }
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
  objekat: SportObject
  date: Date;
  timeoff: string;
  timeto: string;
  capacity: number;
  cena: number;
  bookings: Booking[] = [];
  insert(): void {
    this.bos.getAllTermin().subscribe((data: Booking[]) => {
      this.bookings = data;
      this.maxId();
      this.bos.insert(this.max + 1, this.date, this.timeoff, this.timeto, this.capacity, this.objekat.naziv, this.objekat.kategorija, this.cena, this.objekat.id).subscribe(resp => {
        if (resp['message'] == 'termin added') {
          alert('ok')
          location.reload()
        }
        else alert('ERROR!')
      })
    })
  }
}
