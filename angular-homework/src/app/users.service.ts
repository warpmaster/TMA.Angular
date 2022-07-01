import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {User, USERS} from './users'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getUsers(): Observable<User[]> {
    return of(USERS);
  }
}
