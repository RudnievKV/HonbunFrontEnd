import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MONTENEGRO_API_URL } from '../app-injection-tokens';
import { Observable } from 'rxjs';
import UserCreateDto from '../models/UserDtos/UserCreateDto';
import UserDto from '../models/UserDtos/UserDto';
import UserUpdateDto from '../models/UserDtos/UserUpdateDto';

export const ACCESS_TOKEN_KEY = 'montenegro_access_token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject(MONTENEGRO_API_URL) private apiUrl: string,
    private router: Router
  ) { }


  GetUser(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}api/users/${id}`)
  }
  CreateUser(user: UserCreateDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}api/users`, user);
  }
  UpdateUser(user: UserUpdateDto, id: number): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}api/users/${id}`, user);
  }


}
