import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API_URL = 'https://62334515a3d0e4ac0bde7bd0.mockapi.io/users';

  public user?: User;

  public isAuth: boolean = false;

  constructor(private http: HttpClient) { }

  login(username: string, psw: string): Observable<User | undefined> {
    return this.http.get<User[]>(this.API_URL + '?username=' + username).pipe(
      map((users: User[]) => {
        // for (const user of users) {
        //   if (user.username === username && user.password === psw) {
        //     return user;
        //   }
        // }
        // return null;
        const user = users.find(u => u.username === username && u.password === psw);
        if (user) {
          this.user = user;
          this.isAuth = true;
        }
        return user;
      })
    );
  }

  checkUserPresence(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(this.API_URL + '?username=' + username).pipe(
      map((users: User[]) => {
        const user = users.find(u => u.username === username);
        return user;
      })
    );
  }

  logout() {
    this.isAuth = false;
    this.user = undefined;
  }

  addNewUSer(user: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
    return this.http.post<User>(this.API_URL, user, httpOptions);
  }

}
