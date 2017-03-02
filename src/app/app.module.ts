import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from'@angular/forms'

import { AppComponent }  from './app.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component'
import { TrackComponent } from './track/track.component';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
  FormsModule,
    RouterModule.forRoot([
      { path: 'artist', component: ArtistComponent },
      { path: 'artist/:artistId', component: AlbumComponent },
      { path: 'artist/:artistId/album/:albumId', component: TrackComponent },
      { path: '', redirectTo: 'artist', pathMatch: 'full' },
      { path: '**', redirectTo: 'artist', pathMatch: 'full' }
    ]),
    ],
  declarations: [ AppComponent, ArtistComponent, AlbumComponent, TrackComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
