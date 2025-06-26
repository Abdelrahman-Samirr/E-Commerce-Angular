import { Component , OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage implements OnInit {

  registerForm!:FormGroup;

  ngOnInit() {
  this.registerForm = new FormGroup(
    {
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      userName: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*@%$#])[A-Za-z\d*@%$#]{8,}$/)]),
      confirmPassword: new FormControl("", Validators.required)
    }
  );
}

  submit() {
  console.log(this.registerForm.value);
}
}
