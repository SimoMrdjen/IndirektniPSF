import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditUserService } from '../services/edit-user.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit, OnDestroy {
  visible = false;
  user: User | null = null;
  private visibilitySubscription: Subscription | undefined;

  constructor(
    private editUserService: EditUserService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('on init in EditUserComponent');
    this.visibilitySubscription = this.editUserService.visibility$.subscribe(
      (isVisible) => {
        this.visible = isVisible;
        if (this.visible) {
          this.user = this.editUserService.user;
        }
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    this.visibilitySubscription?.unsubscribe();
  }

  close(): void {
    this.editUserService.close();
  }

  open(): void {
    this.editUserService.open();
  }

  editUser() {
    if (this.user) {
      this.editUserService.editUser(this.user).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }
    this.close();
    this.editUserService.setUser(new User());
  }
}
