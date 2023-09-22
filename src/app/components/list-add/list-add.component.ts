import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import WordCollectionDto from 'src/app/models/WordCollectionDtos/WordCollectionDto';
import { WordCollectionService } from 'src/app/services/word-collection.service';
import { WordService } from 'src/app/services/word.service';
import { Location } from '@angular/common';
import WordCollectionCreateDto from 'src/app/models/WordCollectionDtos/WordCollectionCreateDto';
import { USER_ID } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.scss']
})
export class ListAddComponent {

  constructor(
    private _wordCollectionService: WordCollectionService,
    private _location: Location,
    private route: ActivatedRoute,
    private _wordService: WordService
  ) { }
  loading = false;
  private _routeSub!: Subscription;
  ngOnInit() {
    this._routeSub = this.route.params.subscribe(params => {
      this.wordCollectionID = params['idList'];
    });
  }


  description = '';
  name = '';

  wordCollectionID!: number;
  Add() {
    this.loading = true;

    let newWordCollection = new WordCollectionCreateDto();
    newWordCollection.Description = this.description;
    newWordCollection.Name = this.name;
    let user_ID = localStorage.getItem(USER_ID);
    if (user_ID) {
      newWordCollection.User_ID = parseInt(user_ID);
    }



    this._wordCollectionService.CreateWordCollection(newWordCollection)
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
