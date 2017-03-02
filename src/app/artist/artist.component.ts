import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from'@angular/forms'

import { Artist } from './artist';

import { SpotifyArtistService} from './../shared/spotify.artist.service';

@Component({
  selector: 'artist',
  templateUrl:'./app/artist/artist.component.html',
  styleUrls:['./app/artist/artist.component.css'],
  providers: [SpotifyArtistService]
})
export class ArtistComponent {
  artists: Artist[];
  artistInput: string;
  selectedArtist: Artist;
  message: string;

  constructor(private route: ActivatedRoute,
                private router: Router,
                private spotifyService: SpotifyArtistService) {
  }

  ngOnInit(): void {
  }

  search() {
    this.selectedArtist = null;
    let url = "https://api.spotify.com/v1/search?query="+ this.artistInput + "&type=artist&limit=1";
    this.spotifyService.getArtist(url)
        .subscribe(artists => {
            this.artists = artists;
             if (this.artists && this.artists.length === 1) {
              this.selectedArtist = this.artists[0];
             }
          },
          error => this.message = <any>error);
  }

  getAlbums() {
    if (this.selectedArtist){
      this.router.navigate(['/artist/' + this.selectedArtist.id]);
    } else {
      this.message = 'Could not find artist ' + this.artistInput;
    }
  }
}

