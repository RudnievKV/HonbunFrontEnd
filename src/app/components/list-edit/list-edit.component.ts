import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WordCollectionService } from 'src/app/services/word-collection.service';
import { Location } from '@angular/common';
import { WordService } from 'src/app/services/word.service';
import { Definition, WordCreateDto } from 'src/app/models/WordDtos/WordCreateDto';
import { WordUpdateDto } from 'src/app/models/WordDtos/WordUpdateDto';
import WordCollectionUpdateDto from 'src/app/models/WordCollectionDtos/WordCollectionUpdateDto';
@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent {
  constructor(
    private _wordCollectionService: WordCollectionService,
    private _location: Location,
    private route: ActivatedRoute,
    private _wordService: WordService
  ) { }
  description = '';
  name = '';

  loading = false;
  wordCollectionID!: number;
  private _routeSub!: Subscription;
  ngOnInit() {
    this.loading = true;
    this._routeSub = this.route.params.subscribe(params => {
      this.wordCollectionID = params['idList'];
    });
    this._wordCollectionService.GetWordCollection(this.wordCollectionID.toString())
      .subscribe(response => {
        this.loading = false;
        this.description = response.Description;
        this.name = response.Name;
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

  Edit() {
    this.loading = true;

    let newWordCollection = new WordCollectionUpdateDto();
    newWordCollection.Description = this.description;
    newWordCollection.Name = this.name;

    this._wordCollectionService.UpdateWordCollection(newWordCollection, this.wordCollectionID)
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
