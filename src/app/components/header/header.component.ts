import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import UserInfo from '../../models/userInfo';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {

  userName: string = '';
  userProfileImg: string = ''; 
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Recuperar el estado de autenticación y la información del usuario
    this.isLoggedIn = this.authService.isLoggedUser();
    const userInfo: UserInfo = this.authService.getUserInfo();

    // Si el usuario está logueado, actualizar el nombre y la imagen de perfil
    if (this.isLoggedIn) {
      this.userName = userInfo.name;
      this.userProfileImg = userInfo.profileImg;
    }
  }

  signOut(): void {
    this.authService.signOut();
  }
}