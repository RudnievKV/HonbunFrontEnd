import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WordCollectionService } from 'src/app/services/word-collection.service';
import { Location } from '@angular/common';
import { WordService } from 'src/app/services/word.service';
import { Definition, WordCreateDto } from 'src/app/models/WordDtos/WordCreateDto';

@Component({
  selector: 'app-word-add',
  templateUrl: './word-add.component.html',
  styleUrls: ['./word-add.component.scss']
})
export class WordAddComponent {

  constructor(
    private _wordCollectionService: WordCollectionService,
    private _location: Location,
    private route: ActivatedRoute,
    private _wordService: WordService
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
  meaning = "";
  reading = "";
  partOfSpeech = "";
  originalEntry = "";
  Add() {
    this.loading = true;

    let newWord = new WordCreateDto();
    newWord.IsInSRS = false;
    newWord.Stage_ID = 1;
    newWord.WordCollection_ID = this.wordCollectionID;

    let definition = new Definition();
    definition.Meaning = this.meaning;
    definition.Reading = this.reading;
    definition.PartOfSpeech = this.partOfSpeech;
    definition.OriginalEntry = this.originalEntry;

    let definitions = new Array<Definition>();
    definitions.push(definition);
    newWord.Definitions = definitions;

    this._wordService.CreateWord(newWord)
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
