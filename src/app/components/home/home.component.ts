import { Component } from '@angular/core';
import { firstValueFrom, forkJoin, switchMap } from 'rxjs';
import UserDto from 'src/app/models/UserDtos/UserDto';
import WordCollectionDto from 'src/app/models/WordCollectionDtos/WordCollectionDto';
import { USER_ID } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { WordCollectionService } from 'src/app/services/word-collection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private _wordCollectionService: WordCollectionService,
    private _userService: UserService
  ) { }

  loading = false;
  user!: UserDto;
  userWordCollections!: WordCollectionDto[];
  async ngOnInit() {
    this.loading = true;

    let user_ID = localStorage.getItem(USER_ID);
    if (user_ID) {
      forkJoin([this._userService.GetUser(user_ID), this._wordCollectionService.GetUserWordCollections()])
        .subscribe(response => {
          this.user = response[0];
          this.userWordCollections = response[1];
          this.loading = false;
        },
          (error) => {
            this.loading = false;
          },
          //completed
          () => {

          }
        );

    }
  }
  Review() {

  }
  Delete(index: number) {
    this.loading = true;
    this._wordCollectionService.DeleteWordCollection(index)
      .subscribe(response => {
        this.loading = false;
        window.location.reload();
      },
        (error) => {
          this.loading = false;
        });
  }
  Add() {

  }

}
