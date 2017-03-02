import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Album } from './album';

import { SpotifyAlbumService} from './../shared/spotify.album.service';

@Component({
  selector: 'album',
  templateUrl:'./app/album/album.component.html',
  styleUrls:['./app/album/album.component.css'],
  providers: [SpotifyAlbumService]
})
export class AlbumComponent {
  private sub: Subscription;
  albums: Album[];
  artistId: string;
  selectedAlbum:Album;
  message: string;

  constructor(private route: ActivatedRoute,
                private router: Router,
                private location: Location,
                private spotifyService: SpotifyAlbumService) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        this.artistId = params['artistId'];
        this.getAlbums(this.artistId);
      });
  }

  getAlbums(artistId: string) {
    this.selectedAlbum = null;
    let url = "https://api.spotify.com/v1/artists/"+ artistId + "/albums";
    this.spotifyService.getAlbums(url)
        .subscribe(albums => {
            this.albums = albums;
          },
          error => this.message = <any>error);
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  onBack(): void {
      this.location.back();
  }
}
