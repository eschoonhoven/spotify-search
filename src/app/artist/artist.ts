export interface Artist {
  external_urls : any,
  followers : any,
  genres : any [],
  href : string,
  id : string,
  images : Image [],
  name : string,
  popularity : number,
  type : string,
  uri : string
}

export interface Image {
  height : number;
  url : string;
  width : number;
}
