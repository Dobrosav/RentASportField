import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private r: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user') != 'admin') {
      this.poruka = "ACCESS FORBIDEN"
      return;
    }
    this.link = this.r.url;
  }
  link: string;
  poruka: string;
}
