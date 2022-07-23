import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private s: UserService, private r: Router) { }

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
          alert("rekrativac");
        else
          alert("vlasnik");
      }
      else
        this.poruka = "";

    })
  }
}
