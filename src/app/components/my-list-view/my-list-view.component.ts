import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import WordCollectionDto from 'src/app/models/WordCollectionDtos/WordCollectionDto';
import { WordCollectionService } from 'src/app/services/word-collection.service';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-my-list-view',
  templateUrl: './my-list-view.component.html',
  styleUrls: ['./my-list-view.component.scss']
})
export class MyListViewComponent {
  constructor(
    private _wordCollectionService: WordCollectionService,
    private _wordService: WordService,
    private route: ActivatedRoute,
  ) { }
  wordCollection!: WordCollectionDto;
  private _routeSub!: Subscription;
  id!: number;
  loading = false;
  description = "";
  ngOnInit() {
    this.loading = true;
    this._routeSub = this.route.params.subscribe(params => {
      this.id = params['idList'];
    });

    this._wordCollectionService.GetWordCollection(this.id.toString())
      .subscribe(response => {
        this.wordCollection = response;
        this.description = response.Description;
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
  Delete(wordID: number) {
    this.loading = true;
    this._wordService.DeleteWord(wordID)
      .subscribe(response => {
        this.loading = false;
      },
        (error) => {
          this.loading = false;

        },
        //completed
        () => {
          window.location.reload();
        }
      );
  }
}
