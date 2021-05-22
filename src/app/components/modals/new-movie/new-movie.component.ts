import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface ExternalData {
  id: string;
  title: string;
  description: string;
}
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

  buttonActionTitle: string = 'Editar';

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
  constructor(
    public dialogRef: MatDialogRef<NewMovieComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public externalData: ExternalData
    ) { }

  ngOnInit(): void {
    if (this.externalData == null) {
      this.buttonActionTitle = 'Guardar';
      this.externalData = {
        id: '',
        title: '',
        description: ''
      }
    }

    this.validations();
  }

  validations(){
    this.validations_form = this.formBuilder.group({
      title: new FormControl(this.externalData.title, Validators.compose([
        Validators.required,
        Validators.maxLength(255),
      ])),
      description: new FormControl(this.externalData.description, Validators.compose([
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
    form.id = this.externalData.id;
    this.dialogRef.close(form);
  }
}
