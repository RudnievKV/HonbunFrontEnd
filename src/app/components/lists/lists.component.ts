import { Component } from '@angular/core';
import { Router } from '@angular/router';
import WordCollectionDto from 'src/app/models/WordCollectionDtos/WordCollectionDto';
import { USER_ID } from 'src/app/services/auth.service';
import { WordCollectionService } from 'src/app/services/word-collection.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent {
  loading = false;
  constructor(
    private _wordCollectionService: WordCollectionService,
    private _router: Router
  ) { }

  wordCollections!: Array<WordCollectionDto>;
  ngOnInit() {
    this.loading = true;
    this._wordCollectionService.GetWordCollections()
      .subscribe(response => {
        this.wordCollections = response;
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
  Add(wordCollectionID: number) {
    this.loading = true;
    let user_ID!: number;
    let id = localStorage.getItem(USER_ID);
    if (id) {
      user_ID = parseInt(id);
    }

    this._wordCollectionService.CopyWordCollection(user_ID, wordCollectionID)
      .subscribe(response => {
        this._router.navigateByUrl('');
      },
        (error) => {

        },
        //completed
        () => {
          this.loading = false;
        }
      );
  }
}
