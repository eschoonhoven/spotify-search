export interface Album
{
  album_type : string,
  artists : any [],
  available_markets : any [],
  external_urls : any,
  href : string,
  id : string,
  images : Image[],
  name : string,
  type : string,
  uri : string
}

export interface Image {
  height : number;
  url : string;
  width : number;
}
