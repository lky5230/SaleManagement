import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../serv/auth.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm = {
    userPassword: "",
    userEmail: ""
  };
  constructor(private route: Router, private auth: AuthService) { }

  ngOnInit() {
  }
  registerSubmit(info) {


      localStorage.setItem('user', info.userEmail);
      localStorage.setItem('pas', info.userPassword);
      this.auth.isLoging = true;


  }

}

