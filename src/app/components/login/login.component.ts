import { Component, NgZone } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BackendService } from '../../services/backend.service';
import UserInfo from '../../models/userInfo';
import { environment } from '../../../environments/environment';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService, BackendService]
})
export class LoginComponent {

  private readonly GOOGLE_CLIENT_ID = environment.googleClientId;

  constructor(private router: Router, private authService: AuthService, private backendService: BackendService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initializeGoogleSignIn()
  }

  private initializeGoogleSignIn() {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      google.accounts.id.initialize({
        client_id: this.GOOGLE_CLIENT_ID,
        callback: (resp: any) => {
          this.handleLogin(resp);
        }
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        locale: 'en',
        width: 320,
        height: 100,
        text: 'continue_with'
      });
    } else {
      console.error('Google Identity Services not loaded');
    }
  }

  private decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(decodeURIComponent(escape(atob(base64))));
    return decodedToken;
  }

  handleLogin(response: any) {
    if (response) {
      const payLoad = this.decodeToken(response.credential);
      console.log(payLoad)

      const dataToCreateUser = { name: payLoad.name, email: payLoad.email };
      this.backendService.createUser(dataToCreateUser).subscribe();

      const userInfo: UserInfo = { name: payLoad.given_name, email: payLoad.email, profileImg: payLoad.picture };
      this.authService.signIn(userInfo);
    }
  }
}