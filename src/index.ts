import { IHttpMethodParams } from './interfaces';
import * as helpers from './helpers';

export const fetchDefaultOptions: RequestInit = {
  method: 'post',
  mode: 'cors',
  redirect: 'follow',
  credentials: 'include',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
    Origin: 'http://localhost:8080',
  },
};

export { helpers };

type requestMethod = 'get' | 'post' | 'put' | 'delete' | 'options';

async function FetchRequest(params: IHttpMethodParams, method: requestMethod): Promise<any> {
  params.options = helpers.buildParams(fetchDefaultOptions, params.options || null, { method });

  try {
    const fetchResponse = await fetch(params.url, params.options);
    return helpers.resolveResponse(fetchResponse, params.resolver);
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      status: null,
      json: () => null,
    };
  }
}

export function Get(params: IHttpMethodParams): Promise<Response> {
  return FetchRequest(params, 'get');
}

export function Post(params: IHttpMethodParams): Promise<Response> {
  return FetchRequest(params, 'post');
}

export function Put(params: IHttpMethodParams): Promise<Response> {
  return FetchRequest(params, 'put');
}

export function Delete(params: IHttpMethodParams): Promise<Response> {
  return FetchRequest(params, 'delete');
}

export function Options(params: IHttpMethodParams): Promise<Response> {
  return FetchRequest(params, 'options');
}
