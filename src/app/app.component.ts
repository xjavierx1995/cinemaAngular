import { Component } from '@angular/core';

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
    }
  ];

  active(a){
    console.log(a);

  }
}
