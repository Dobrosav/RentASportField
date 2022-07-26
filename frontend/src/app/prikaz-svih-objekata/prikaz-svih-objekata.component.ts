import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SportObject } from 'src/models/sportobject';
import { SportObjectService } from '../sport-object.service';

@Component({
  selector: 'app-prikaz-svih-objekata',
  templateUrl: './prikaz-svih-objekata.component.html',
  styleUrls: ['./prikaz-svih-objekata.component.css']
})
export class PrikazSvihObjekataComponent implements OnInit {

  constructor(private s: SportObjectService, private r: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("user") == null) {
      this.poruka = "You did not log in";
      return;
    }
    this.user = sessionStorage.getItem("user");
    this.s.getAllObjectsOfOwner(this.user).subscribe((obj: SportObject[]) => {
      this.objekti = obj;
    })
  }
  poruka: string;
  user: string;
  objekti: SportObject[] = [];
  clickToInputDateInfo(id: number): void {
    sessionStorage.setItem('objekat', id.toString());
    this.r.navigate(["/vlasnik/termini/datumi"]);
  }
}
