import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private afs: AngularFirestore) { }

  getMovies(){
    return this.afs.collection('movies-collection').snapshotChanges();
  }

  storeMovie(params){
    return this.afs.collection("movies-collection").add(params)
  }

  deleteMovie(id){
    return this.afs.collection('movies-collection').doc(id).delete();
  }

  showMovie(id){
    return this.afs.collection('movies-collection').doc(id).valueChanges();
  }

  updateMovie(params, id){
    return this.afs.collection('movies-collection').doc(id).update(params);
  }
}
