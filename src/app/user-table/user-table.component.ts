import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { EditUserService } from '../services/edit-user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnInit {
  public users: User[] = [];

  constructor(
    private userService: UserService,
    private editUserService: EditUserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getUsersWithoutSecurity();
  }

  getUsers() {
    this.editUserService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => {
        alert('Error occurred');
      },
    });
  }

  editUser(user: User) {
    this.editUserService.setUser(user);
    console.log(user);
    this.editUserService.open();
  }

  getUsersWithoutSecurity() {
    this.editUserService.getUsersWithoutSecurity().subscribe((response) => {
      console.log(response);
      this.users = response;
    });
  }
}
