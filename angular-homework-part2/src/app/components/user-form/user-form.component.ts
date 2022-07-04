import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { UsersService } from "../../services/users.service";

import { User } from "../../users";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  model: User = {
    id: -1,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    img: '',
  };

  form!: FormGroup;

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    const user: User | null = this.usersService.getSelectedUser();

    if (user) {
      this.model = [...Object.keys(this.model)]
        .reduce((object, property)  => {
          // @ts-ignore
          object[property] = user[property as keyof User];
          return object;
      }, {} as User);
    }

    this.form = new FormGroup({
      firstname: new FormControl(this.model.firstname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60)
      ]),
      lastname: new FormControl(this.model.lastname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60)
      ]),
      email: new FormControl(this.model.email,[
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl(this.model.phone, [
        Validators.required,
        Validators.pattern(/^\d*$/)
      ]),
      img: new FormControl(this.model.img)
    })
  }

  onSubmit(): void {
    const user: User = { id: this.model.id, ...this.form.value };

    if (!this.model.id || this.model.id === -1) {
      this.usersService.addUser(user).subscribe();
    } else {
      this.usersService.saveUser(user).subscribe();
    }

    this.model.id = -1;
    this.form.reset();

    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setErrors(null);
    });
  }

  onBlur(property: string) {
    const value = this.form.value[property];

    this.form.patchValue({
        [property]: value.trim()
      });
  }
}
