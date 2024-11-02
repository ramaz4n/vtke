import {
  DefaultApiResponse,
  FetchPaginationRequest,
  FetchPaginationResponse,
  FetchResponse,
  FetchSlug,
  PaginationRequestProps,
} from '../global.ts';

export interface WikiCategoriesListResponseProps {
  banner: string;
  createdAt: number;
  id: number;
  name: string;
}

export interface CreateCategoryProps {
  name: string;
}

export interface EditCategoryPostProps {
  name?: string;
}

export interface CategoryViewResponse {
  banner: string;
  createdAt: number;
  id: number;
  name: string;
}

export interface SectionListRequestProps {
  categoryId: number;
  sectionId?: number;
}
export interface SectionListResponse {
  categoryId: number;
  createdAt: number;
  id: number;
  name: string;
  sectionId: number;
  updatedAt: number;
}

export interface CreateSectionPostProps {
  categoryId: number;
  name: string;
  sectionId?: number;
}
export interface ViewSectionResponse {
  categoryId: number;
  createdAt: number;
  id: number;
  name: string;
  sectionId: number;
  updatedAt: number;
}

export interface EditSectionPostProps {
  categoryId: number;
  name: string;
  sectionId?: number;
}

export interface CreateArticleProps {
  sectionId: number;
  text: string;
  title: string;
}

export interface Article {
  createdAt: number;
  id: number;
  section: {
    categoryId: number;
    createdAt: number;
    id: number;
    name: string;
    sectionId: number;
    updatedAt: number;
  };
  text: string;
  title: string;
  updatedAt: number;
}

export type EditArticleProps = Partial<{
  text: string;
  title: string;
  sectionId?: number;
}>;

export interface CreateArticle {
  data: CreateArticleProps;
  response: DefaultApiResponse;
}

export interface EditArticle {
  request: {
    data: EditArticleProps;
    id: FetchSlug;
  };
  response: DefaultApiResponse;
}

export type ArticleParams = FetchPaginationRequest<{ sectionId?: number }>;

export interface ArticleList {
  params: ArticleParams;
  response: FetchPaginationResponse<Article>;
}

export interface ArticleView {
  id: FetchSlug;
  response: FetchResponse<Article>;
}

export interface CreateCategory {
  data: CreateCategoryProps;
  response: DefaultApiResponse;
}

export interface EditCategory {
  request: {
    data: EditCategoryPostProps;
    id: FetchSlug;
  };
  response: DefaultApiResponse;
}

export interface CategoryList {
  params: PaginationRequestProps;
  response: FetchPaginationResponse<WikiCategoriesListResponseProps>;
}

export interface CategoryView {
  id: FetchSlug;
  response: FetchResponse<CategoryViewResponse>;
}

export interface UploadCategoryBanner {
  request: {
    data: FormData;
    id: FetchSlug;
  };
  response: DefaultApiResponse;
}

export interface CreateSection {
  data: CreateSectionPostProps;
  response: DefaultApiResponse;
}

export interface EditSection {
  request: {
    data: EditSectionPostProps;
    id: FetchSlug;
  };
  response: DefaultApiResponse;
}

export interface SectionList {
  params: FetchPaginationRequest<SectionListRequestProps>;
  response: FetchPaginationResponse<SectionListResponse>;
}

export interface SectionView {
  id: FetchSlug;
  response: FetchResponse<ViewSectionResponse>;
}
