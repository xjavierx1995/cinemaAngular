import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/services/users.service';
import { NewUserMoviesComponent } from '../modals/new-user-movies/new-user-movies.component';
import { map } from 'rxjs/operators';
import { UserMoviesService } from 'src/app/services/user-movies.service';

@Component({
  selector: 'app-user-movies',
  templateUrl: './user-movies.component.html',
  styleUrls: ['./user-movies.component.scss']
})
export class UserMoviesComponent implements OnInit {

  typeView: string = 'table';
  dataUsers: any;
  userMovieSelect: any;
  displayedColumns: string[] = [
    'title',
    'description',
    'id',
  ];

  dataMovies: any[];

  constructor(
    public dialog: MatDialog,
    public snack: MatSnackBar,
    private userService: UsersService,
    private userMovieService: UserMoviesService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){

    this.userService.getUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.dataUsers = data;
      console.log(data);

    });

  }

  displayFnUser(user): string {
    return user && user.name ? user.name + ' ' +user.last_name : '';
  }

  newModal(){
    const dialogRef = this.dialog.open(NewUserMoviesComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.type === 'submit') {
        this.spinner.show()
        this.storeUserMovie(result);
      }
    });
  }

  storeUserMovie(data){

    let params = {
      ...data.movie
    }

    this.userMovieService.storeUser(params, this.userMovieSelect.key).then((result) => {
      this.spinner.hide();
      this.snack.open('Película asignada con exito', 'ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })
    }).catch((err) => {

    });


  }

  getUserMovies(key){
    console.log(key);

    this.userMovieService.showUserMovies(key).snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data);
      this.dataMovies = data;
    });
  }

}
