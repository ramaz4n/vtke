import {
  FetchPaginationRequest,
  FetchPaginationResponse,
  FetchSlug,
} from '../global.ts';

export interface TagProps {
  createdAt: number;
  description: string;
  id: number;
  name: string;
  updatedAt: number;
}

export type TagListParams = Partial<{
  name: string;
}>;

export interface TagList {
  request: FetchPaginationRequest<TagListParams>;
  response: FetchPaginationResponse<TagProps>;
}

export type CreateTagProps = Partial<{
  description: string;
  name: string;
}>;

export type EditTagProps = CreateTagProps;

export type EditTagParams = { data: EditTagProps; id: FetchSlug };
