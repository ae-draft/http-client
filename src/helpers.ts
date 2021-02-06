import { FetchResolvers } from './declares';
import { AjaxException } from './exceptions/ajaxException';

export interface IHelpers {
  handleError: (err: Error | undefined, serverErrorMsg?: string) => void;
  resolveResponse: (response: Response, resolver?: FetchResolvers) => Promise<any>;
  buildParams: (defaultParams: RequestInit, newParams: RequestInit | null, ...additional: RequestInit[]) => RequestInit;
  buildUrl: (host: string, path: string) => string;
}

export function handleError(err: Error | undefined, serverErrorMsg?: string) {
  throw new AjaxException('Ошибка выполнения ajax-запроса', err, serverErrorMsg);
}

export function resolveResponse(response: Response, resolver?: FetchResolvers): Promise<any> {
  switch (resolver) {
    case 'json':
      return response.json();
    case 'text':
      return response.text();
    case 'blob':
      return response.blob();
    default:
      return Promise.resolve(response);
  }
}

export function buildParams(defaultParams: RequestInit, newParams: RequestInit | null, ...additional: RequestInit[]) {
  let adds;

  if (additional.length > 0) {
    adds = additional.reduce((prev, current) => ({ ...prev, ...current }));
  }

  return {
    ...defaultParams,
    ...newParams,
    ...adds,
  };
}

export function buildUrl(host: string, path: string) {
  return host + path;
}
