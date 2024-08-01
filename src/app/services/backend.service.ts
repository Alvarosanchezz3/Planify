import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  urlBase: string = 'http://localhost:8080/api/'

  constructor(private router: Router, private http: HttpClient) {}

  createUser(data: any) {
    return this.http.post(this.urlBase + "users/create", data)
  }

  getBoardsUser(email: string) {
    return this.http.get(this.urlBase + "boards/user/" + email)
  }
}