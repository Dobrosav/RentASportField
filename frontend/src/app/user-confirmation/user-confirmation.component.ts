import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {

  constructor(private s: UserService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user') != 'admin') {
      this.poruka = "ACCESS FORBIDEN"
      return;
    }
    this.s.getInvalidUsers().subscribe((data: User[]) => {
      this.invalidUsers = data;
    })
    this.s.getUsers().subscribe((data: User[]) => {
      this.allUsers = data;
      this.allUsers = this.allUsers.filter(value => value.korime != "admin")
    })
  }
  poruka: string;
  invalidUsers: User[] = [];
  allUsers: User[] = []
  confirm(korime: string): void {
    this.s.confirm(korime).subscribe(resp => {
      alert(resp['message'])
      location.reload()
    })
  }
  deleteUser(korime: string) {
    this.s.delete(korime).subscribe(resp => {
      alert(resp['message'])
      location.reload()
    })
  }
}
