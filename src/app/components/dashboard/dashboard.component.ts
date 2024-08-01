import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import UserInfo from '../../models/userInfo';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [AuthService, BackendService]
})
export class DashboardComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: any;

  areBoards: boolean = true;
  boards = [
    { id: 1, title: 'Proyecto Iberdrola', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id cupiditate fuga veniam laborum quod aut ducimus aliquam.' },
    { id: 2, title: 'Login empleados', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id cupiditate fuga veniam laborum quod aut ducimus aliquam.' },
    { id: 3, title: 'Formulario Sábado', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id cupiditate fuga veniam laborum quod aut ducimus aliquam.' },
    { id: 4, title: 'Funcionalidad tabla', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id cupiditate fuga veniam laborum quod aut ducimus aliquam.' }
  ];

  constructor(private authService: AuthService, private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    // Recuperar el estado de autenticación y la información del usuario
    this.isLoggedIn = this.authService.isLoggedUser();
    const userInfo: UserInfo = this.authService.getUserInfo();

    // Si el usuario está logueado, actualizar el nombre y la imagen de perfil
    if (this.isLoggedIn) {
      this.userName = userInfo.name;
    }
  }

  getBoards(email: any): void {
    this.backendService.getBoardsUser(email)
      .subscribe(
        (data: any) => {
          //console.log(data);
        },
        error => {
          console.error('Error al obtener los tableros:', error);
        }
      );
  }

  navigate(title: string): void {
    // Reemplaza espacios con guiones en el título
    const formattedTitle = title.replace(/ /g, '-');
    this.router.navigate([`/board/${formattedTitle}`]);
  }
}