import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import UserCreateDto from 'src/app/models/UserDtos/UserCreateDto';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registerForm!: FormGroup;
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router

  ) { }
  RegistrationValidator = new RegistrationValidator();
  ngOnInit() {
    if (this._authService.isAuthenticated()) {
      this._router.navigateByUrl('');
      return;
    }

    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    },
      {
        validators: [this.RegistrationValidator.passwordMatch()],
        updateOn: 'change',
      }
    );
  }
  loading = false;
  onSubmit() {
    console.log(0);
    this.loading = true;
    if (this.registerForm.valid) {
      console.log(1);

      let newUser = new UserCreateDto();
      newUser.Email = this.registerForm.get('email')?.value;
      newUser.Password = this.registerForm.get('password')?.value;
      newUser.Username = this.registerForm.get('username')?.value;
      this._userService.CreateUser(newUser)
        .subscribe(
          {
            error: (e) => { alert("Такой емейл уже зарегистрирован!"); },
            complete: () => {
              this.loading = false;
              alert("Успешно зарегистрировано!");
              this._router.navigateByUrl('login')
            }
          });
    }
    this.loading = false;
  }
}

export class RegistrationValidator {
  public passwordMatch(): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get('password');
      const confirmPasswordControl = formGroup.get('confirmPassword');

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true }
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}
