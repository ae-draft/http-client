import { FetchResolvers } from './declares';

export interface IHttpMethodParams {
  url: string;
  options?: RequestInit;
  resolver?: FetchResolvers;
}
