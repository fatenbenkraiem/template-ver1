import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  SESSION ='authenticatedUser'

  public username: String="";
  public password: String ="";

  constructor(private http: HttpClient) {

  }

  authenticationService( userauth:User) {
    
    this.username =  userauth.username;
    this.password =  userauth.password;
       
    return this.http.get(`http://localhost:8000/api/auth`,
      { headers: { authorization: this.createAuthToken( userauth.username,  
        userauth.password) } })
      .pipe(map((res) => {
        console.log(res)
       
      }));
  }

  createAuthToken(username: String, password: String) {
    sessionStorage.setItem(this.SESSION, this.username.toString())
    sessionStorage.setItem("password", this.password.toString())
    return 'Basic ' + window.btoa(username + ":" + password)
  }  

  isUserLoggedIn() {
    
     if (sessionStorage.getItem(this.SESSION) === null) return false
    return true
  }
logout(){
  console.log(sessionStorage.getItem(this.SESSION))
  console.log(sessionStorage.getItem("password"))
  sessionStorage.removeItem(this.SESSION)
}
  
}