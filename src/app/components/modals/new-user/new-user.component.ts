import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
export interface ExternalData {
  key: string;
  id: string;
  name: string;
  last_name: string;
}
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  buttonActionTitle: string = 'Editar';

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  validation_messages = {
    'name': [
      { type: 'required', message: 'Este campo es requerido.' },
      { type: 'maxlength', message: 'No debe ser mayor a 255 caracteres.' },
     ],
    'lastname': [
     { type: 'required', message: 'Este campo es requerido.' },
     { type: 'maxlength', message: 'No debe ser mayor a 255 caracteres.' },
    ],
    'id': [
     { type: 'required', message: 'Este campo es requerido.' },
     { type: 'maxlength', message: 'No debe ser mayor a 255 caracteres.' },
    ]
  };
  constructor(
    public dialogRef: MatDialogRef<NewUserComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public externalData: ExternalData
    ) { }

  ngOnInit(): void {
    if (this.externalData == null) {
      this.buttonActionTitle = 'Guardar';
      this.externalData = {
        key: '',
        id: '',
        name: '',
        last_name: '',
      }
    }

    this.validations();
  }

  validations(){
    this.validations_form = this.formBuilder.group({
      id: new FormControl(this.externalData.id, Validators.compose([
        Validators.required,
        Validators.maxLength(255),
      ])),
      name: new FormControl(this.externalData.name, Validators.compose([
        Validators.required,
        Validators.maxLength(255),
      ])),
      last_name: new FormControl(this.externalData.last_name, Validators.compose([
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
    form.key = this.externalData.key;
    this.dialogRef.close(form);
  }

}
