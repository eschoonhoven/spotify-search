import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Track } from './track'

import { SpotifyTrackService} from './../shared/spotify.track.service';

@Component({
  selector: 'tracks',
  templateUrl:'./app/track/track.component.html',
  styleUrls:['./app/track/track.component.css'],
  providers: [SpotifyTrackService]
})
export class TrackComponent {
  private sub: Subscription;
  albumId: string;
  tracks:Track[];
  message: string;

  constructor(private route: ActivatedRoute,
            private router: Router,
            private location: Location,
            private spotifyService: SpotifyTrackService) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        this.albumId = params['albumId'];
        this.getTracks(this.albumId);
    });
  }

  getTracks(albumId: string) {
    let url = "https://api.spotify.com/v1/albums/" + albumId + "/tracks";
    this.spotifyService.getTracks(url)
        .subscribe(tracks => {
            this.tracks = tracks;
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
