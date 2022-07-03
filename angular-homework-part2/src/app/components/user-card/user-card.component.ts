import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalUser } from "../users-list/users-list.component";
import { UsersService } from "../../services/users.service";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input()
  user!: LocalUser;

  @Output()
  checkboxEvent = new EventEmitter<MatCheckboxChange>();

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
  }

  checked(ob: MatCheckboxChange) {
    this.checkboxEvent.emit(ob);
  }
}
