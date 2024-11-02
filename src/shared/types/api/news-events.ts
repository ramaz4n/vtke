import {
  DefaultApiResponse,
  FetchPaginationRequest,
  FetchPaginationResponse,
  FetchResponse,
  FetchSlug,
} from '../global.ts';

export type NewsEventsListRequest = Partial<{
  description: string;
  institutionId: number;
  public: number;
  publishedAt: number;
  startedAt: number;
  title: string;
  type: number;
  updatedAt: number;
  userId: number;
}>;

export interface NewsEvents {
  createdAt: number;
  description: string;
  id: number;
  institutionId: number;
  public: number;
  publishedAt: number;
  startedAt: number;
  title: string;
  type: number;
  updatedAt: number;
  userId: number;
}

export type NewsEventsList = {
  request: FetchPaginationRequest<NewsEventsListRequest>;
  response: FetchPaginationResponse<NewsEvents>;
};

export type NewsEventsCreatePost = Partial<{
  description: string;
  institutionId: number;
  public: number;
  publishedAt: number;
  startedAt: number;
  title: string;
  type: number;
  updatedAt: number;
  userId: number;
}>;

export type NewsEventsCreate = {
  data: NewsEventsCreatePost;
  response: DefaultApiResponse;
};

export type NewsEventsEditPost = Partial<{
  description: string;
  institutionId: number;
  public: number;
  publishedAt: number;
  startedAt: number;
  title: string;
  type: number;
  updatedAt: number;
  userId: number;
  id?: number;
}>;

export interface NewsEventsEdit {
  request: {
    data: NewsEventsEditPost;
    id: FetchSlug;
  };
  response: DefaultApiResponse;
}

export interface NewsEventsView {
  id: FetchSlug;
  response: FetchResponse<NewsEvents>;
}
