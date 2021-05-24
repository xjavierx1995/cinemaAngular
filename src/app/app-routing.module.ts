import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MoviesComponent } from './components/movies/movies.component';
import { UserMoviesComponent } from './components/user-movies/user-movies.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'movies', component: MoviesComponent, canActivate:[AuthGuard] },
  {path: 'users', component: UsersComponent, canActivate:[AuthGuard] },
  {path: 'users-movies', component: UserMoviesComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
