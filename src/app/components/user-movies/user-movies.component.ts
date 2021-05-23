import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewUserMoviesComponent } from '../modals/new-user-movies/new-user-movies.component';

@Component({
  selector: 'app-user-movies',
  templateUrl: './user-movies.component.html',
  styleUrls: ['./user-movies.component.scss']
})
export class UserMoviesComponent implements OnInit {

  typeView: string = 'table';

  constructor(
    public dialog: MatDialog,
    public snack: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
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

  }

}
