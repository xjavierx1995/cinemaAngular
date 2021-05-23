import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MoviesComponent } from './components/movies/movies.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';
import { NewMovieComponent } from './components/modals/new-movie/new-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NewUserComponent } from './components/modals/new-user/new-user.component';
import { UserMoviesComponent } from './components/user-movies/user-movies.component';
import { NewUserMoviesComponent } from './components/modals/new-user-movies/new-user-movies.component';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    UsersComponent,
    DashboardComponent,
    NewMovieComponent,
    NewUserComponent,
    UserMoviesComponent,
    NewUserMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    PipesModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
