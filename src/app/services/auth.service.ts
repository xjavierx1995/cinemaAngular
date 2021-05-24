import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(private afsAuth: AngularFireAuth) {
    this.afsAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  loginEmailUser(params){
    let result = this.afsAuth.signInWithEmailAndPassword(params.email, params.password);
    return result;
  }

  async register(email: string, password: string) {
    var result = await this.afsAuth.createUserWithEmailAndPassword(email, password)
  }

  async logout(){
    await this.afsAuth.signOut();
    localStorage.removeItem('user');
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }
}
