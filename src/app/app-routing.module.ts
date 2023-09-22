import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ListAddComponent } from './components/list-add/list-add.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { ListsComponent } from './components/lists/lists.component';
import { MyListViewComponent } from './components/my-list-view/my-list-view.component';
import { WordEditComponent } from './components/word-edit/word-edit.component';
import { WordAddComponent } from './components/word-add/word-add.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { OtherListViewComponent } from './components/other-list-view/other-list-view.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReviewComponent } from './components/review/review.component';
import { WordAddFromTextComponent } from './components/word-add-from-text/word-add-from-text.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent
      },
      {
        path: 'mylist',
        children: [
          {
            path: 'list-add',
            canActivate: [AuthGuard],
            component: ListAddComponent
          },
          {
            path: ':idList/change',
            canActivate: [AuthGuard],
            component: ListEditComponent
          },
          {
            path: ':idList',
            children: [
              {
                path: 'view',
                canActivate: [AuthGuard],
                component: MyListViewComponent,
              },
              {
                path: 'words',
                children: [
                  {
                    path: ':idWord/change',
                    canActivate: [AuthGuard],
                    component: WordEditComponent
                  },
                  {
                    path: 'word-add',
                    canActivate: [AuthGuard],
                    component: WordAddComponent
                  },
                  {
                    path: 'word-add-from-text',
                    canActivate: [AuthGuard],
                    component: WordAddFromTextComponent
                  }
                  // {
                  //   path: ':idWord/view',
                  //   component: Word
                  // }
                ]
              }
            ]
          }

        ]
      },


      {
        path: 'lists',
        component: ListsComponent,
        children: [
          {
            path: 'idList:/view',
            canActivate: [AuthGuard],
            component: OtherListViewComponent
          }
        ]
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileViewComponent
      },
      {
        path: 'profile/change',
        canActivate: [AuthGuard],
        component: ProfileEditComponent
      },
      {
        path: 'review',
        canActivate: [AuthGuard],
        component: ReviewComponent
      },
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
