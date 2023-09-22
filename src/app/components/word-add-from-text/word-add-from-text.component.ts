import { Component } from '@angular/core';
import { WordCollectionService } from 'src/app/services/word-collection.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-word-add-from-text',
  templateUrl: './word-add-from-text.component.html',
  styleUrls: ['./word-add-from-text.component.scss']
})
export class WordAddFromTextComponent {

  constructor(
    private _wordCollectionService: WordCollectionService,
    private _location: Location,
    private route: ActivatedRoute,
  ) { }
  text = "";
  loading = false;
  wordCollectionID!: number;
  private _routeSub!: Subscription;
  ngOnInit() {
    this._routeSub = this.route.params.subscribe(params => {
      this.wordCollectionID = params['idList'];
    });
  }
  Add() {
    this.loading = true;
    this._wordCollectionService.CreateWordsFromText(this.text, this.wordCollectionID)
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
