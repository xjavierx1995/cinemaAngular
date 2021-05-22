import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoviesService } from 'src/app/services/movies.service';
import { NewMovieComponent } from '../modals/new-movie/new-movie.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  DATA: object[];
  displayedColumns: string[] = [
    'title',
    'description',
    'id',
  ];
  showLoader: boolean = false;
  constructor(public dialog: MatDialog,
      public snack: MatSnackBar,
      private movieService: MoviesService
      ) { }

  ngOnInit(): void {
    this.getMovies()
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

  getMovies(){
    this.movieService.getMovies().subscribe((res: any[]) => {
      let result = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      })

      this.DATA = result;
    });

  }

  storeMovie(data){

    let params = {
      description: data.description,
      title: data.title
    }

    this.movieService.storeMovie(params).then((result) => {
      this.showLoader = false;
      this.snack.open('Película registrada con exito', 'ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })
    }).catch((err) => {
      console.log(err);

    });
  }

  deleteMovie(id){
    this.showLoader = true;
    this.movieService.deleteMovie(id).then((result) => {
      this.showLoader = false;
      this.snack.open('Película eliminada con exito', 'ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })

    }).catch((err) => {
      console.log(err);

    });
  }

}
