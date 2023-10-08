import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { EditUserService } from '../services/edit-user.service';
import { HttpClient } from '@angular/common/http';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnInit {
  public users: User[] = [];
  public usersPaginated: User[] = [];
  pageSize = 10;
  totalItems = 0;
  currentPage = 1;

  constructor(
    private userService: UserService,
    private editUserService: EditUserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  onPageChange(pageIndex: number): void {
    console.log('paginating');

    this.currentPage = pageIndex;
    this.fetchData();
  }

  fetchData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.usersPaginated = this.users.slice(startIndex, endIndex);
  }

  getUsers() {
    this.editUserService.getUsers().subscribe({
      next: (response) => {
        console.log(response);
        this.users = <any>response;
        console.log(this.users);
      },
      error: (err) => {
        alert('Error occurred');
      },
    });
  }

  editUser(user: User) {
    this.editUserService.setUser(user);
    this.editUserService.addingUser = false;
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
