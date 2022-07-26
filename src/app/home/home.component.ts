import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;
  constructor(private usersSer: UsersService) { }

  ngOnInit(): void {
    this.usersSer.getUsers().subscribe(data => {
      this.users = data;
    });
  }

}
