import { Component } from '@angular/core';
import { Router } from '@angular/router';
import WordDto from 'src/app/models/WordDtos/WordDto';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  loading = false;

  constructor(
    private _wordService: WordService,
    private _router: Router
  ) { }

  remainingWordDtos!: Array<WordDto>;

  currentCount = 0;
  numberOfWords = 0;
  show = false;

  ngOnInit() {
    this.loading = true;
    this._wordService.GetSRSWords()
      .subscribe(response => {
        this.remainingWordDtos = response;
        this.numberOfWords = response.length;
        this.loading = false;
      },
        (error) => {
          this.loading = false;
        },
        //completed
        () => {
          this.loading = false;
        }
      );
  }
  ShowAnswer() {

    this.show = true;
  }
  AnswerIncorrently() {
    this.loading = true;



    this._wordService.UpdateWordBasedOnReview(this.remainingWordDtos[this.currentCount].Word_ID, false)
      .subscribe(response => {
        this.loading = false;
        this.show = false;
        this.currentCount++;

      },
        (error) => {
          this.loading = false;
        },
        //completed
        () => {
          this.loading = false;
          if (this.currentCount >= this.numberOfWords) {
            this._router.navigateByUrl('');
          }
        }
      );
  }
  AnswerCorrently() {
    this.loading = true;





    this._wordService.UpdateWordBasedOnReview(this.remainingWordDtos[this.currentCount].Word_ID, true)
      .subscribe(response => {
        this.loading = false;
        this.show = false;
        this.currentCount++;

      },
        (error) => {
          this.loading = false;
        },
        //completed
        () => {
          this.loading = false;
          if (this.currentCount >= this.numberOfWords) {
            this._router.navigateByUrl('');
          }
        }
      );

  }
}
