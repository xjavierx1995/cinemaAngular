import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MoviesComponent } from './components/movies/movies.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'movies', component: MoviesComponent },
  {path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
