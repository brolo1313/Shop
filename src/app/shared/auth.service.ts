import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(User: { email: any; password: any; }){
    return this.http
    .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User)
    .pipe(
      tap(this.setToken)
    )
  }

  private setToken ( response:any ) {
    if(response){
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-tokenn-exp', expDate.toString());
      localStorage.setItem('fb-tokenn', response.idToken);
    }else {
      localStorage.clear();
    }
  }

  get token () {
    const expDate = new Date(localStorage.getItem('fb-tokenn-exp') || '{}')
    if(new Date > expDate) {
      this.logout();
      return null; 
    }
      return localStorage.getItem('fb-tokenn')
  }

  logout(){
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }

  
}
