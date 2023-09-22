import { Inject, Injectable } from '@angular/core';
import WordCollectionDto from '../models/WordCollectionDtos/WordCollectionDto';
import { Observable } from 'rxjs';
import UserCreateDto from '../models/UserDtos/UserCreateDto';
import UserDto from '../models/UserDtos/UserDto';
import UserUpdateDto from '../models/UserDtos/UserUpdateDto';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import WordCollectionCreateDto from '../models/WordCollectionDtos/WordCollectionCreateDto';
import WordCollectionUpdateDto from '../models/WordCollectionDtos/WordCollectionUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class WordCollectionService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }

  GetWordCollection(id: string): Observable<WordCollectionDto> {
    return this.http.get<WordCollectionDto>(`${this.apiUrl}api/wordCollections/${id}`)
  }
  GetUserWordCollections(): Observable<WordCollectionDto[]> {
    return this.http.get<WordCollectionDto[]>(`${this.apiUrl}api/wordCollections/user`)
  }
  GetWordCollections(): Observable<WordCollectionDto[]> {
    return this.http.get<WordCollectionDto[]>(`${this.apiUrl}api/wordCollections`)
  }
  CreateWordCollection(wordCollection: WordCollectionCreateDto): Observable<WordCollectionDto> {
    return this.http.post<WordCollectionDto>(`${this.apiUrl}api/wordCollections`, wordCollection);
  }

  CreateWordsFromText(text: string, wordCollectionID: number): Observable<WordCollectionDto> {
    var request = {
      Text: text,
      WordCollectionID: wordCollectionID
    }
    return this.http.post<WordCollectionDto>(`${this.apiUrl}api/wordCollections/createWordsFromText`, request);
  }
  CopyWordCollection(userID: number, wordCollectionID: number): Observable<WordCollectionDto> {
    var request = {
      User_ID: userID,
      WordCollection_ID: wordCollectionID
    }
    return this.http.post<WordCollectionDto>(`${this.apiUrl}api/wordCollections/copyWordCollection`, request);
  }
  UpdateWordCollection(wordCollection: WordCollectionUpdateDto, id: number): Observable<WordCollectionDto> {
    return this.http.put<WordCollectionDto>(`${this.apiUrl}api/wordCollections/${id}`, wordCollection);
  }
  DeleteWordCollection(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}api/wordCollections/${id}`);
  }
}
