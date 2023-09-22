import { Location } from '@angular/common';
import { Component } from '@angular/core';
import UserUpdateDto from 'src/app/models/UserDtos/UserUpdateDto';
import { USER_ID } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {

  constructor(
    private _userService: UserService,
    private _location: Location
  ) { }

  username!: string;
  email!: string;
  password!: string;
  loading = false;

  ngOnInit() {
    this.loading = true;
    let id = localStorage.getItem(USER_ID);
    if (id) {
      this.user_ID = parseInt(id);
    }

    this._userService.GetUser(this.user_ID.toString())
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
  user_ID!: number;
  Change() {
    let newUser = new UserUpdateDto();
    newUser.Email = this.email;
    newUser.Password = this.password;
    newUser.Username = this.username;




    this._userService.UpdateUser(newUser, this.user_ID)
      .subscribe(response => {
        this.loading = false;

      },
        (error) => {
          this.loading = false;
        },
        //completed
        () => {
          this._location.back();
        }
      );
  }
  Cancel() {
    this._location.back();
  }
}
