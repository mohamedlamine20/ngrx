import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../models/authresponsedata.model';
import { User } from '../models/user.mode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  timeoutInterval :any;
  url='http://localhost:32050/auth'

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.url}/login`,
      {
        email,
        password,
      })
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.url}/signup`,
      {
        email,
        password
      })
  }

  formatUser(data: AuthResponseData) {
    console.log(data.expirationDate);
    
    const expirationDate = new Date(data.expirationDate);   
    console.log(expirationDate);
    
    const user = new User(data.email, data.token, data.localId, expirationDate)
    return user;

  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'email not found';
      case 'INVALID_PASSWORD':
        return 'invalid password';
      case 'EMAIL_EXISTS':
        return 'Email already exist'
      default:
        return 'Unknown error occurred .Please try again';
    }

  }


  setUserInLocalStorage(user : User){
    localStorage.setItem('userData',JSON.stringify(user));


    this.runTimeoutInterval(user);
  }
  runTimeoutInterval(user:User){
    const todaysDate =  new Date().getTime();

    const expirationDate = user.expireDate.getTime(); 

    const timeInterval = expirationDate - todaysDate;

   this.timeoutInterval =  setTimeout(()=>{
      
      //logout functionality or get the refresh token 

    },timeInterval);
   }



  getUserFromLocalStorage(){
  const userDataString  =  localStorage.getItem('userData');
  if(userDataString){
    const userData = JSON.parse(userDataString);
    const expirationDate = new Date(userData.expireDate)
    const user  = new User(userData.email,userData.token,userData.localId,expirationDate);
    this.runTimeoutInterval(user);
    return user;
  }
  return null;
  }

  logout(){
    localStorage.removeItem('userData');
    if(this.timeoutInterval){
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval=null;
       
    }

  }
}
