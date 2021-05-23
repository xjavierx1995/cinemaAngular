import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';
import { MoviesService } from 'src/app/services/movies.service';
@Component({
  selector: 'app-new-user-movies',
  templateUrl: './new-user-movies.component.html',
  styleUrls: ['./new-user-movies.component.scss']
})
export class NewUserMoviesComponent implements OnInit {

  validations_form: FormGroup;
  validation_messages = {
    'user': [
      { type: 'required', message: 'Este campo es requerido.' },
      { type: 'maxlength', message: 'No debe ser mayor a 255 caracteres.' },
     ],
    'movie': [
     { type: 'required', message: 'Este campo es requerido.' },
     { type: 'maxlength', message: 'No debe ser mayor a 255 caracteres.' },
    ]
  };

  options: string[] = ['One', 'Two', 'Three'];
  dataUsers: any;
  dataMovies: any;

  constructor(
    public dialogRef: MatDialogRef<NewUserMoviesComponent>,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private movieService: MoviesService,
  ) { }

  ngOnInit(): void {
    this.validations();
    this.getUsers();
    this.getMovies();
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

  getMovies(){

    this.movieService.getMovies().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.dataMovies = data;
    });

  }

  displayFnUser(user): string {
    return user && user.name ? user.name + ' ' +user.last_name : '';
  }

  displayFnMovie(movie): string {
    return movie && movie.title ? movie.title : '';
  }

  validations(){
    this.validations_form = this.formBuilder.group({
      movie: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(255),
      ])),
      /* user: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(255),
      ])) */

    });
  }

  onNoClick(): void {
    let form = {
      type: 'close'
    };
    this.dialogRef.close(form);
  }

  register(form){
    form.type = 'submit';
    this.dialogRef.close(form);
  }

}
