import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private dbPath = '/users';

  usersRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  getUsers() {
    return this.usersRef;
  }

  storeUser(params) {
    return this.usersRef.push(params);
  }

  deleteUser(id) {
    return this.usersRef.remove(id)
  }

  showUser(id) {

  }

  updateUser(params, id) {
    return this.usersRef.update(id, params);
  }
}
