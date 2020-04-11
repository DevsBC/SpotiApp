import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) {
    console.log("Spotify Service");
  }

  getQuery(query:string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDb3GwjLHCbmR9Sj7gmYrXkxO9Zc6uUm2oQPWEvdixr0MX_mMXzyoI99gR8C3sSIxuKMKbywM-ocrieBopDxSumdAQe7_A_uFViSg7O3IxWfpUYtFsJiQ-gE01pELzinR1aGiUCEA'
    });
    return this.http.get(url, {headers});
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(map(data => {
      return data['albums'].items;
    }));      
  }

  getArtists(termino:string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
    .pipe(map(data => data['artists'].items));
  
  }

  getArtist(id:string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id:string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe(map(data=>data['tracks']));
  }

}

