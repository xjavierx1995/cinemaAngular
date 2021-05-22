import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewMovieComponent } from '../modals/new-movie/new-movie.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  DATA: object[]  = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  showLoader: boolean = false;
  constructor(public dialog: MatDialog, public snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  newMovieModal(){
    const dialogRef = this.dialog.open(NewMovieComponent, {
      width: '250px',
      // data: {name: 'Javier', animal: 'Dragon'}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.type === 'submit') {
        this.showLoader = true;
        this.storeMovie(result);
      }

      // this.animal = result;
    });
  }

  storeMovie(data){

    let params = {
      description: data.description,
      title: data.title
    }

    setTimeout(() => {
      this.showLoader = false;

      this.snack.open('Película registrada con exito', 'ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })
    }, 5000);


  }

}
