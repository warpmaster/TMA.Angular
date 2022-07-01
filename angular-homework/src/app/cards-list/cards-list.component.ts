import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from "@angular/material/checkbox";

import { UsersService } from '../users.service';
import { User } from '../users'

export interface LocalUser extends User {
  isChecked?: boolean;
}

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  users: LocalUser[] = [];
  currentUsers: LocalUser[] = [];
  isDeleteDisabled = true;
  search: string = '';

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => this.users = users.map( user => ({ ...user, isChecked: false })));

    this.currentUsers = [...this.users];
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
    this.users = this.users.filter( user => !user.isChecked );
    this.currentUsers = [...this.users];
    this.isDeleteDisabled = true;
    this.search = '';
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
