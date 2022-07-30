import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private s: UserService, private r: Router, public translate:TranslateService) { 
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
  }
  korime: string;
  password: string;
  poruka: string;
  login(): void {
    this.s.login(this.korime, this.password).subscribe((user: User) => {
      if (user) {
        sessionStorage.setItem("user", user.korime);
        if (user.tip == 0)
            this.r.navigate(["/admin"])
        else if (user.tip == 1)
          this.r.navigate(["/rekreativac"])
        else
          this.r.navigate(["/vlasnik"])
      }
      else
        this.poruka = "Bad Data!";

    })
  }
}
