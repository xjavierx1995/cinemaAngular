import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private dbPath = '/movies';

  moviesRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.moviesRef = db.list(this.dbPath);
  }

  getMovies(){
    return this.moviesRef;
  }

  storeMovie(params){
    return this.moviesRef.push(params);
  }

  deleteMovie(id){
    return this.moviesRef.remove(id)
  }

  showMovie(id){

  }

  updateMovie(params, id){
    return this.moviesRef.update(id, params);
  }
}
