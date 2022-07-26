import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/models/booking';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-rekreativac',
  templateUrl: './rekreativac.component.html',
  styleUrls: ['./rekreativac.component.css']
})
export class RekreativacComponent implements OnInit {

  constructor(private r: Router, private bos: BookingService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user') == null) {
      alert("You did not log in");
      return;
    }
    this.bos.getAllTermin().subscribe((data: Booking[]) => {
      this.bookings = data;
    })
  }
  naziv: string;
  kategorija: string;
  date: string;
  timeoff: string;
  timeto: string;

  bookings: Booking[] = [];
  filter(): void {
    let sati=parseInt(this.timeoff.split(':')[0])*60
    let minutiod=parseInt(this.timeoff.split(':')[1])
    let ukupnood=sati+minutiod;
    let satido=parseInt(this.timeto.split(':')[0])*60
    let minutido=parseInt(this.timeto.split(':')[1])
    let ukupnodo=satido+minutido
    alert(ukupnood)
    this.bos.getAllTermin().subscribe((data: Booking[]) => {
      this.bookings = data;
      if (this.naziv)
        this.bookings = this.bookings.filter(b => b.naziv == this.naziv)
      if (this.kategorija)
        this.bookings = this.bookings.filter(b => b.kategorija == this.kategorija)
      if (this.date)
        this.bookings = this.bookings.filter(b => b.date == this.date)
      if(this.timeoff)
        this.bookings= this.bookings.filter(b=>(parseInt(b.timeoff.split(':')[0])*60+parseInt(b.timeoff.split(':')[1]))>=ukupnood)
      if(this.timeto)
      this.bookings= this.bookings.filter(b=>(parseInt(b.timeto.split(':')[0])*60+parseInt(b.timeto.split(':')[1]))<=ukupnodo)
    })
  }
}
