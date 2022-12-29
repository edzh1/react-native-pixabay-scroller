export type PixabayResponse = {
  total: number;
  totalHits: number;
  hits: SearchResult[];
};

export type SearchResult = {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
};

export type SearchState = {
  searchResult: PixabayResponse;
  page: number;
  error?: string;
  searchQuery: string;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
};

export type SearchResultDetails = {
  id: number;
  tags: string;
  largeImageURL: string;
  user: string;
  imageWidth: number;
  imageHeight: number;
};
