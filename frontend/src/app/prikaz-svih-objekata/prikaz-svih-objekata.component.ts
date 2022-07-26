import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SportObject } from 'src/models/sportobject';
import { User } from 'src/models/user';
import Swal from 'sweetalert2';
import { SportObjectService } from '../sport-object.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-prikaz-svih-objekata',
  templateUrl: './prikaz-svih-objekata.component.html',
  styleUrls: ['./prikaz-svih-objekata.component.css']
})
export class PrikazSvihObjekataComponent implements OnInit {

  constructor(private s: SportObjectService, private us:UserService, private r: Router, public translate: TranslateService) {
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
    if (sessionStorage.getItem("user") == null) {
      this.poruka = "You did not log in";
      return;
    }
    
    this.user = sessionStorage.getItem("user");
    this.us.getUsePerUsername(this.user).subscribe((u:User)=>{
      this.u=u;
    })
    this.s.getAllObjectsOfOwner(this.user).subscribe((obj: SportObject[]) => {
      this.objekti = obj;
    })
  }
  poruka: string;
  user: string;
  u:User;
  objekti: SportObject[] = [];
  clickToInputDateInfo(id: number): void {
    sessionStorage.setItem('objekat', id.toString());
    this.r.navigate(["/vlasnik/termini/datumi"]);
  }
  delete(id: number): void {
    this.s.delete(id).subscribe(resp => {
      Swal.fire({
        title:"deleted successFully",
        text:resp['message']+" deleted successFully",
        icon:"success",
        timer:2000,
        showConfirmButton:false
      }).then(()=>{
        location.reload()
      })
    })
  }
}
