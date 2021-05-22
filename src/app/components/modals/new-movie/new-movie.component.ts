import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit {

  data = {
    name: '',
    title: ''
  }

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  validation_messages = {
    'title': [
      { type: 'required', message: 'Este campo es requerido.' },
      { type: 'maxlength', message: 'No debe ser mayor a 255 caracteres.' },
     ],
    'description': [
     { type: 'required', message: 'Este campo es requerido.' },
     { type: 'maxlength', message: 'No debe ser mayor a 255 caracteres.' },
    ]
  };
  constructor(public dialogRef: MatDialogRef<NewMovieComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validations();
  }

  validations(){
    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(255),
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(255),
      ])),

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
