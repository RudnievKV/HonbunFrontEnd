import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import WordCollectionCreateDto from '../models/WordCollectionDtos/WordCollectionCreateDto';
import WordCollectionDto from '../models/WordCollectionDtos/WordCollectionDto';
import { WordCreateDto } from '../models/WordDtos/WordCreateDto';
import WordDto from '../models/WordDtos/WordDto';
import { WordUpdateDto } from '../models/WordDtos/WordUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  CreateWord(word: WordCreateDto): Observable<WordDto> {
    return this.http.post<WordDto>(`${this.apiUrl}api/words`, word);
  }
  GetWord(id: string): Observable<WordDto> {
    return this.http.get<WordDto>(`${this.apiUrl}api/words/${id}`)
  }
  GetSRSWords(): Observable<WordDto[]> {
    return this.http.get<WordDto[]>(`${this.apiUrl}api/words/srs`)
  }
  UpdateWordBasedOnReview(id: number, isCorrect: boolean): Observable<WordDto> {
    let request = {
      IsAnswerCorrect: isCorrect
    }
    return this.http.put<WordDto>(`${this.apiUrl}api/words/srs/${id}`, request)
  }
  UpdateWord(word: WordUpdateDto, id: number): Observable<WordDto> {
    return this.http.put<WordDto>(`${this.apiUrl}api/words/${id}`, word);
  }
  DeleteWord(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/words/${id}`);
  }
}
