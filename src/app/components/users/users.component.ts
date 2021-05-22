import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { NewUserComponent } from '../modals/new-user/new-user.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  DATA: object[];
  displayedColumns: string[] = [
    'id',
    'name',
    'last_name',
    'action',
  ];
  showLoader: boolean = false;

  typeView: string = 'table';
  constructor(public dialog: MatDialog,
      public snack: MatSnackBar,
      private userService: UsersService,
      private spinner: NgxSpinnerService
      ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  newMovieModal(){
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '400px',
      // data: {name: 'Javier', animal: 'Dragon'}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.type === 'submit') {
        // this.showLoader = true;
        this.spinner.show()
        this.storeUser(result);
      }
    });
  }

  getUsers(){
    this.spinner.show();

    this.userService.getUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.DATA = data;
      this.spinner.hide();
    });

  }

  storeUser(data){

    let params = {
      id: data.id,
      name: data.name,
      last_name: data.last_name
    }

    this.userService.storeUser(params).then((result) => {
      this.spinner.hide()
      this.snack.open('Usuario registrado con exito', 'ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })
    }).catch((err) => {
      console.log(err);

    });
  }

  deleteUser(id){
    this.spinner.show();
    this.userService.deleteUser(id).then((result) => {
      this.spinner.hide();
      this.snack.open('Usuario eliminado con exito', 'ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })

    }).catch((err) => {
      console.log(err);

    });
  }

  editUser(params){

    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '400px',
      data: params
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.type === 'submit') {
        // this.showLoader = true;
        this.spinner.show()
        this.updateUser(result);
      }
    });
  }

  updateUser(data){

    let params = {
      id: data.id,
      name: data.name,
      last_name: data.last_name
    }

    this.userService.updateUser(params, data.key).then((result) => {
      this.spinner.hide()
      this.snack.open('Usuario actualizado con exito', 'ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })
    }).catch((err) => {
      console.log(err);
    });
  }

}
