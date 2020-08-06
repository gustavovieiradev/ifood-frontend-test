export interface IDataToken {
  access_token: string;
  token_type: string;
  expires_in: string;
}

export interface IImagesPlaylist {
  url: string;
}

export interface IFilters {
  id: string;
  name: string;
  values?: IFilterValues[];
  validation?: IFilterValidation;
}

export interface IFilterValues {
  value: string;
  name: string;
}

export interface IFilterValidation {
  primitiveType: string;
  entityType?: string;
  pattern?: string;
  min?: number;
  max?: number;
}

export interface IResponsePlayList {
  message: string;
  playlists: {
    items: IPlaylist[];
  };
} 

export interface IResponseFilter {
  filters: IFilters[];
}

export interface IPlaylist {
  name: string;
  description: string;
  images: IImagesPlaylist[];
}

export interface IFieldFilter {
  [key: string]: string | number;
}