import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SportObject } from 'src/models/sportobject';
import { SportObjectService } from '../sport-object.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(public translate: TranslateService, private sos:SportObjectService) {
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
  objects:SportObject[]=[]
  object2:SportObject[]=[]
  ngOnInit(): void {
      this.sos.getAllObjects().subscribe((data:SportObject[])=>{
        this.objects=data;
        let startPoz=this.objects.length-1
        let br=5
        while (br>0) {
          this.object2.push(this.objects[startPoz--]);
          br--
        }
      })
  }

}
