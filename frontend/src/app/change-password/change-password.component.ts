import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public translate:TranslateService, private s:UserService, private r:Router) { 
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
    let username=sessionStorage.getItem('user')
    this.s.getUsePerUsername(username).subscribe((u:User)=>{
      this.user=u
    })
  }
  checkOldPassword():boolean{
    if(this.old==this.user.lozinka)
      return true
    return false
  }
  checkPasswordEqual():boolean{
    return this.lozinka==this.np
  }
  validatePassword():boolean{
    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(this.lozinka))
        return true
    return false
  }
  old:string
  lozinka:string
  np:string  
  user:User
  poruka:string
  change(){
    if(!this.checkOldPassword()){
      this.poruka="stara lozinka nije dobra"
      return
    }
    if(!this.checkPasswordEqual()){
      this.poruka='lozinke se ne poklapaju'
      return
    }
    if(!this.validatePassword()){
      this.poruka="Lozinka nije jaka"
      return
    }
    this.s.changePassword(sessionStorage.getItem('user'),this.lozinka).subscribe(resp=>{
      alert(resp['message'])
      if(this.user.tip==2)
        this.r.navigate(["/vlasnik"])
      else if(this.user.tip==1)
        this.r.navigate(["/rekreativac"])
    })
  }

}
