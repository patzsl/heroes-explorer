export interface IMarvelApiResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: IData;
}

export interface IData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: IHero[];
}

export interface IHero {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: IThumbnail;
  resourceURI: string;
  comics: IComics;
  series: ISeries;
  stories: IStories;
  events: IEvents;
  urls: IUrl[];
}

export interface IThumbnail {
  path: string;
  extension: string;
}

export interface IComics {
  available: number;
  collectionURI: string;
  items: IItem[];
  returned: number;
}

export interface ISeries {
  available: number;
  collectionURI: string;
  items: IItem[];
  returned: number;
}

export interface IStories {
  available: number;
  collectionURI: string;
  items: IItem[];
  returned: number;
}

export interface IItem {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface IEvents {
  available: number;
  collectionURI: string;
  items: IItem[];
  returned: number;
}

export interface IUrl {
  type: string;
  url: string;
}
