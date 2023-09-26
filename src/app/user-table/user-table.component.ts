import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { EditUserService } from '../services/edit-user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnInit {
  public users: User[] = [];

  constructor(
    private userService: UserService,
    private editUserService: EditUserService
  ) {
    this.users = userService.users;
  }
  editUser(user: User) {
    this.editUserService.setUser(user);
    console.log(user);
    this.editUserService.open();
  }
  ngOnInit(): void {}
}
