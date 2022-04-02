import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 private readonly API_URL='https://6229de55be12fc4538aa6c8e.mockapi.io/users';

 public allUsers:User[]=[];

  constructor( private http:HttpClient) { 

   this.getUsers();

  }

  
getUsers(){

  this.http.get<User[]>(this.API_URL ).subscribe(users => this.allUsers=users);

}

}
