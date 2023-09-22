import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Login from 'src/app/models/Login';
import UserCreateDto from 'src/app/models/UserDtos/UserCreateDto';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router

  ) { }
  SignInForm!: FormGroup;
  loading = false;

  ngOnInit() {
    if (this._authService.isAuthenticated()) {
      this._router.navigateByUrl('')
    }
    this.SignInForm = new FormGroup({
      email: new FormControl('example@gmail.com', [
        Validators.required,
        Validators.minLength(8),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
    });
  }
  onSubmit() {
    console.log(3);
    this.loading = true;

    if (this.SignInForm.valid) {
      let login = new Login();
      login.Email = this.SignInForm.get('email')?.value;
      login.Password = this.SignInForm.get('password')?.value;
      this._authService.login(login.Email, login.Password)
        .subscribe(
          {
            error: (e) => { alert("Неверный логин или пароль!"); },
            complete: () => { this.loading = false; this._router.navigateByUrl('') }
          });
    } else {
      alert("Неверный логин или пароль!");
    }
  }
}
