import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ListAddComponent } from './components/list-add/list-add.component';
import { WordAddComponent } from './components/word-add/word-add.component';
import { WordAddFromTextComponent } from './components/word-add-from-text/word-add-from-text.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { WordEditComponent } from './components/word-edit/word-edit.component';
import { HomeComponent } from './components/home/home.component';
import { MyListViewComponent } from './components/my-list-view/my-list-view.component';
import { OtherListViewComponent } from './components/other-list-view/other-list-view.component';
import { ListsComponent } from './components/lists/lists.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReviewComponent } from './components/review/review.component';
import { AUTH_API_URL, MONTENEGRO_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ListAddComponent,
    WordAddComponent,
    WordAddFromTextComponent,
    ListEditComponent,
    WordEditComponent,
    HomeComponent,
    ProfileViewComponent,
    MyListViewComponent,
    OtherListViewComponent,
    ProfileEditComponent,
    ListsComponent,
    RegistrationComponent,
    ReviewComponent,
    NotFoundComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains
      }
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: AUTH_API_URL,
      useValue: environment.authApi,
    },
    {
      provide: MONTENEGRO_API_URL,
      useValue: environment.montenegroApi
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
