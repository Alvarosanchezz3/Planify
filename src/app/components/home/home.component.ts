import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [AuthService]
})
export class HomeComponent implements OnInit{

  isLoggedIn: boolean = false; 

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedUser();
  }

  navigate(ruta: string): void {
    this.router.navigateByUrl(ruta);
  }
}