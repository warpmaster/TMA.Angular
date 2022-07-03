import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../users'
import { LocalUser } from "../components/users-list/users-list.component";
import { MessageService } from "./message.service";

type SelectedUser = User | null;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  maxId: number = -1;

  selectedUser: SelectedUser = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
      this.http.get<User[]>(this.usersUrl)
        .pipe(catchError(this.handleError<User[]>('getUsers', [])))
        .subscribe( users => this.maxId = Math.max(...users.map( user => user.id)));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  addUser(user: User): Observable<User> {
    user.id = ++this.maxId;

    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  saveUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.put<User>(url, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`updated user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('saveUser'))
    );
  }

  deleteUser(id: number) {
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`deleted user w/ id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  setSelectedUser(user: User | null): void {
    this.selectedUser = user;
  }

  getSelectedUser(): User | null {
    return this.selectedUser;
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
