import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginComponent } from './components/modals/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cinemaAngular';
  routes: object[] = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'dashboard'
    },
    {
      name: 'Peliculas',
      url: '/movies',
      icon: 'theaters'
    },
    {
      name: 'Usuarios',
      url: '/users',
      icon: 'person'
    },
    {
      name: 'Arriendo',
      url: '/users-movies',
      icon: 'checklist_rtl'
    }
  ];
  isLogged: any;
  path: string = '';
  constructor(
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    public snack: MatSnackBar
  ) {
    this.isLogged = this.authService.isLoggedIn;

  }

  ngOnInit(): void {
    this.verifiRoute()
  }

  verifiRoute(url?){
    this.path = url ? url.split('/')[1] : window.location.pathname.split('/')[1];
  }

  openModal() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.type === 'submit') {
        this.spinner.show()
        this.login(result);
      }
    });

  }

  login(data) {
    let params = {
      email: data.email,
      password: data.password
    }
    this.spinner.show();
    this.authService.loginEmailUser(params).then((result) => {
      this.isLogged = result.user;
      this.spinner.hide()
      this.snack.open('Sesión iniciada', 'ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })
    }).catch((err) => {
      this.spinner.hide()
      this.snack.open('La información no coincide con ningúno de nuestros registros', 'ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })
    });

  }

  logout() {
    this.spinner.show();
    this.authService.logout().then((result) => {
      this.isLogged = this.authService.isLoggedIn;
      this.spinner.hide();
      this.snack.open('Gracias por usar cinema angular!', 'ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000
      })
      this.router.navigate(['/dashboard']);
    }).catch((err) => {
      console.log(err);

    });
  }
}
