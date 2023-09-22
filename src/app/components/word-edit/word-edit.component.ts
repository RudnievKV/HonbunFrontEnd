import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WordCollectionService } from 'src/app/services/word-collection.service';
import { Location } from '@angular/common';
import { WordService } from 'src/app/services/word.service';
import { Definition, WordCreateDto } from 'src/app/models/WordDtos/WordCreateDto';
import { WordUpdateDto } from 'src/app/models/WordDtos/WordUpdateDto';

@Component({
  selector: 'app-word-edit',
  templateUrl: './word-edit.component.html',
  styleUrls: ['./word-edit.component.scss']
})
export class WordEditComponent {
  constructor(
    private _wordCollectionService: WordCollectionService,
    private _location: Location,
    private route: ActivatedRoute,
    private _wordService: WordService
  ) { }
  text = "";
  loading = false;
  wordCollectionID!: number;
  wordID!: number;
  private _routeSub!: Subscription;
  ngOnInit() {
    this.loading = true;
    this._routeSub = this.route.params.subscribe(params => {
      this.wordCollectionID = params['idList'];
      this.wordID = params['idWord'];
    });
    this._wordService.GetWord(this.wordID.toString())
      .subscribe(response => {
        this.loading = false;
        this.meaning = response.MeaningReadings[0].Meaning;
        this.reading = response.MeaningReadings[0].Reading;
        this.partOfSpeech = response.MeaningReadings[0].PartOfSpeech;
        this.originalEntry = response.MeaningReadings[0].OriginalEntry;
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
  meaning = "";
  reading = "";
  partOfSpeech = "";
  originalEntry = "";
  Edit() {
    this.loading = true;

    let newWord = new WordUpdateDto();
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

    this._wordService.UpdateWord(newWord, this.wordID)
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
