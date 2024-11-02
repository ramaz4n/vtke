import { FetchPaginationRequest, FetchPaginationResponse } from '../global.ts';

interface CountriesListParamsProps {
  id?: number;
  name?: string;
}
interface CountriesListResponse {
  id: number;
  name: string;
}

interface CitiesListParamsProps {
  countryId?: number;
  id?: number;
  name?: string;
}

interface CitiesListResponse {
  id: number;
  name: string;
}

export interface CitiesList {
  params: FetchPaginationRequest<CitiesListParamsProps>;
  response: FetchPaginationResponse<CitiesListResponse>;
}

export interface CountriesList {
  response: FetchPaginationResponse<CountriesListResponse>;
  params?: FetchPaginationRequest<CountriesListParamsProps>;
}
