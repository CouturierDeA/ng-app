export interface SolrResponse<T> {
  // result set start position
  start: number;
  // items in result set
  rows: number;
  // items found in result set
  numFound: number;
  // additional query params
  query?: string;
  // result set
  searchList: T[];
}

export interface PaginationRequest {
  // result set start position
  start: number;
  // items in result set
  rows: number;
  // additional query params
  query?: string;
  // result set
  numFound?: number;
}

export interface SolrRequest extends PaginationRequest {
}
