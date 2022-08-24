import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/models/user';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private s: UserService,private r: Router, public translate: TranslateService) {
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
    this.captcha = this.makeid();
    this.s.getUsers().subscribe((data: User[]) => {
      this.users = data
    })
  }
  makeid(): string {
    let result: string = ""
    let array: string[] = ["wheat", "hide", "concerned", "letter", "current", "individual",
      "kept", "voyage", "sell", "model", "basic", "half", "serious", "give", "simply", "donkey", "material", "another",
      "deep", "using", "relationship", "health", "fought", "behind",
      "other", "realize", "changing", "movie", "temperature", "claws",
      "door", "tail", "fairly", "period", "experiment", "cheese",
      "consider", "mother", "appropriate", "school", "child", "usually"]
    result = array[Math.floor(Math.random() * array.length)]
    return result;
  }
  ime: string;
  prezime: string;
  korime: string;
  lozinka: string;
  lozinkap: string;
  grad: string;
  datumRodjenja: Date;
  email: string;
  telefon: string;
  tip: number;
  message: string;
  users: User[] = [];
  captcha: string;
  inputcaptcha: string;

  checkPassword(): boolean {
    return this.lozinka == this.lozinkap;
  }
  checkImePrezimeIgrad(): boolean {
    if (this.ime.length > 3 && this.prezime.length > 3 && this.grad.length > 3 && this.korime.length > 3 && this.email.length > 5 && this.telefon.length > 6 && this.telefon.length < 10)
      return true
    return false
  }
  validateMail(): boolean {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
      return true
    return false
  }
  validatePassword(): boolean {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(this.lozinka))
      return true
    return false
  }
  checkUserExist(): boolean {
    let u: User = this.users.filter(value => value.email == this.email || value.korime == this.korime)[0]
    if (u)
      return true;
    return false;
  }
  register(): void {
    /* if (this.checkUserExist()) {
       this.message = "Postoji korime ili emali adresa probajte sa drugim podacima"
       return;
     }*/
    if (!this.validateMail()) {
      this.message = "Mail nije validan"
      return;
    }
    if (!this.checkImePrezimeIgrad) {
      this.message = "Niste uneli ime, prezime, grad, korime, email ili telefon"
      return;
    }
    if (this.captcha != this.inputcaptcha) {
      this.message = "Captcha is not OK";
      return;
    }
    if (!this.validatePassword()) {
      this.message = "Lozinka nije u dobrom formatu"
      return;
    }
    if (!this.checkPassword()) {
      this.message = "Lozinke se ne podudaraju"
      return;
    }
    let valid: Boolean;
    if (this.tip == 1)
      valid = true;
    else
      valid = false
    this.s.getUsers().subscribe((data: User[]) => {
      this.users = data
      let u: User = this.users.filter(a => a.korime == this.korime || a.email == this.email)[0]
      if (u) {
        this.message = "Postoji korime ili emali adresa probajte sa drugim podacima"
        return;
      }
      this.s.register(this.ime, this.prezime, this.korime, this.lozinka, this.grad, this.datumRodjenja, this.email, this.telefon, this.tip, valid).subscribe((resp) => {
        if (resp['message'] == 'user added') {
          Swal.fire({
            title:resp['message'],
            text:resp['message'],
            icon:"success",
            timer:2000,
            showConfirmButton:false
          }).then(()=>{
              this.r.navigate(["/"]);
          })
        } else {
          Swal.fire("ERROR","ERROR","warning")
        }
        this.message = "";
      })
    })
  }
}
