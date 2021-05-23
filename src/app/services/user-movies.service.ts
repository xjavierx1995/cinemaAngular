import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class UserMoviesService {
  private dbPath = '/userMovies';

  usersRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  getUsers() {
    return this.usersRef;
  }

  storeUser(params, key) {
    return this.db.database.ref(this.dbPath+'/'+key).push(params);
    // return this.usersRef.push(params);
  }

  deleteUserMovie(Userkey, MovieKey) {
    return this.db.list(this.dbPath+'/'+Userkey).remove(MovieKey);
  }

  showUserMovies(key) {
    return this.db.list(this.dbPath+'/'+key);
    return this.db.list(this.dbPath+'/'+key);
  }

  updateUser(params, id) {
    return this.usersRef.update(id, params);
  }
}
