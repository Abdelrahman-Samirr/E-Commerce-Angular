import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, RouterModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  submit(loginForm:NgForm){
    console.log(loginForm.value)
  }
}



