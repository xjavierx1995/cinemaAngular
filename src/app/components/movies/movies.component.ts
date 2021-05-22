import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
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

  typeView: string = 'table';
  constructor(public dialog: MatDialog,
      public snack: MatSnackBar,
      private movieService: MoviesService,
      private spinner: NgxSpinnerService
      ) { }

  ngOnInit(): void {
    this.getMovies()
  }

  newMovieModal(){
    const dialogRef = this.dialog.open(NewMovieComponent, {
      width: '400px',
      // data: {name: 'Javier', animal: 'Dragon'}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.type === 'submit') {
        // this.showLoader = true;
        this.spinner.show()
        this.storeMovie(result);
      }
    });
  }

  getMovies(){
    this.spinner.show();
    this.movieService.getMovies().subscribe((res: any[]) => {
      let result = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      })
      this.spinner.hide();
      this.DATA = result;
    });

  }

  storeMovie(data){

    let params = {
      description: data.description,
      title: data.title
    }

    this.movieService.storeMovie(params).then((result) => {
      this.spinner.hide()
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
    this.spinner.show();
    this.movieService.deleteMovie(id).then((result) => {
      this.spinner.hide();
      this.snack.open('Película eliminada con exito', 'ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })

    }).catch((err) => {
      console.log(err);

    });
  }

  editMovie(params){

    const dialogRef = this.dialog.open(NewMovieComponent, {
      width: '400px',
      data: params
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.type === 'submit') {
        // this.showLoader = true;
        this.spinner.show()
        this.updateMovie(result);
      }
    });
  }

  updateMovie(data){
    let params = {
      description: data.description,
      title: data.title
    }

    this.movieService.updateMovie(params, data.id).then((result) => {
      this.spinner.hide()
      this.snack.open('Película actualizada con exito', 'ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })
    }).catch((err) => {
      console.log(err);
    });
  }

}
