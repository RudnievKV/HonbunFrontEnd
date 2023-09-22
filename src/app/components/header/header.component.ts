import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {

  }
  isAuthenticated(): boolean {
    return this._authService.isAuthenticated();
  };
  logOut() {
    this._authService.logout();
    this._router.navigateByUrl('/login');
  }
}
