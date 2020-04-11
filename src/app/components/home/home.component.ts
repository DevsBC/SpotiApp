import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  newReleases:any[] = [];
  loading:boolean; 
  error: boolean;
  messaggeError:string;

  constructor(private spotify:SpotifyService) { 
    this.loading = true;
    this.error = false;
  
    this.spotify.getNewReleases().subscribe((data:any)=> {
      console.log(data);
      this.newReleases = data;
      this.loading = false;
    }, (response) => {
        console.error(response)
        this.messaggeError = response.error.error.message;
        this.error = true;
        this.loading = false;
    });
  }

}
