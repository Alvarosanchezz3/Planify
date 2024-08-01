
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import UserInfo from "../models/userInfo";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Method to check if the user is logged in
  isLoggedUser(): boolean {
    return localStorage.getItem('isLogged') === 'true';
  }

  // Method to get user information
  getUserInfo(): UserInfo {
    const storedUserInfo = localStorage.getItem('infoUser');
    return storedUserInfo ? JSON.parse(storedUserInfo) : { name: '', email: '', profileImg: '' };
  }

  // Method to sign in the user
  signIn(userInfo: UserInfo): void {
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('infoUser', JSON.stringify(userInfo));
    this.router.navigate(['']).then(() => {
      window.location.reload(); 
    });
  }

  // Method to sign out the user
  signOut(): void {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('infoUser');
    this.router.navigate(['login']).then(() => {
      window.location.reload();  
    });
  }
}