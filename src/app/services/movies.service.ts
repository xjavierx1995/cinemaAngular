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
    return new Promise<any>((resolve, reject) =>{
      this.afs
        .collection("movies-collection")
        .add(params)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  deleteMovie(id){

  }

  showMovie(id){

  }

  updateMovie(params, id){

  }
}
