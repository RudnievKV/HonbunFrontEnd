import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { USER_ID } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent {

  constructor(
    private _userService: UserService,
    private route: ActivatedRoute,
    private _location: Location
  ) { }
  private _routeSub!: Subscription;
  loading = false;
  email!: string;
  username!: string;
  ngOnInit() {
    this.loading = true;
    let user_ID: string = "";
    let id = localStorage.getItem(USER_ID);
    if (id) {
      user_ID = id;
    }

    this._userService.GetUser(user_ID)
      .subscribe(response => {
        this.email = response.Email;
        this.username = response.Username;
        this.loading = false;
      },
        (error) => {
          this.loading = false;
          this._location.back();
        },
        //completed
        () => {

        }
      );
  }
  Back() {
    this._location.back();
  }
}
