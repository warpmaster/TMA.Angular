import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from "@angular/material/checkbox";

import { UsersService } from '../../services/users.service';
import { User } from '../../users'

export interface LocalUser extends User {
  isChecked?: boolean;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: LocalUser[] = [];
  currentUsers: LocalUser[] = [];
  isDeleteDisabled = true;
  search: string = '';

  constructor(public usersService: UsersService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => {
        this.users = (users).map( user => ({
          ...user,
          isChecked: false
        }));
        this.currentUsers = [...this.users];
      });
  }

  checkThemAll(): void {
    this.currentUsers.forEach( user => user.isChecked = true );
    this.isDeleteDisabled = false;
  }

  onCheckboxChange(ob: MatCheckboxChange): void {
    if (ob.checked) {
      this.isDeleteDisabled = false;
    } else {
      this.isDeleteDisabled = !this.users.some( user => user.isChecked );
    }
  }

  delete(): void {
    this.isDeleteDisabled = true;
    this.search = '';

    this.users.forEach( user => {
      if (user.isChecked) {
        this.usersService.deleteUser(user.id).subscribe();
      }
    });
    this.users = this.users.filter( user => !user.isChecked );
    this.currentUsers = [...this.users];
  }

  sort(event: any): void {
    const directions: any = {
      asc: 1,
      desc: -1
    }

    const direction: number = directions[event.target.value];

    this.currentUsers.sort( (user1, user2) => {
      return direction *
        (
          user1.lastname.toLowerCase() === user2.lastname.toLowerCase() ?
          user1.firstname.toLowerCase().localeCompare(user2.firstname.toLowerCase()) :
          user1.lastname.toLowerCase().localeCompare(user2.lastname.toLowerCase())
        )
    });
  }

  filter(): void {
    this.currentUsers = this.users.filter( user => {
      return user.lastname.toLowerCase().startsWith(this.search.toLowerCase()) ||
             user.firstname.toLowerCase().startsWith(this.search.toLowerCase());
    });
  }
}
