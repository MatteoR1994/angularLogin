import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API_URL = 'https://62334515a3d0e4ac0bde7bd0.mockapi.io/users';

  public loginState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  checkUserLogin(userData: any): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + '?username=' + userData.username);
  }

  searchUSernamePResence(userData: any): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + '?username=' + userData.username).pipe(
      map((users) => users.filter((user:any) => user.username === userData.username))
    );
  }

  addNewUSer(user: User) {
    const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})}
    return this.http.post<User>(this.API_URL, user, httpOptions);
  }

}
