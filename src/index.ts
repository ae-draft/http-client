import { IHttpMethodParams } from './interfaces';
import * as helpers from './helpers';

interface IDefaults {
  basePath: string;
}
export let Defaults: IDefaults = {
  basePath: null,
};

const fetchDefaultOptions: RequestInit = {
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

type requestMethod = 'get' | 'post' | 'put' | 'delete' | 'options';

async function FetchRequest(params: IHttpMethodParams, method: requestMethod): Promise<any> {
  params.options = helpers.buildParams(fetchDefaultOptions, params.options || null, { method });
  params.url = helpers.buildUrl(Defaults.basePath, params.url);

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

function Get(params: IHttpMethodParams): Promise<Response> {
  return FetchRequest(params, 'get');
}

function Post(params: IHttpMethodParams): Promise<Response> {
  return FetchRequest(params, 'post');
}

function Put(params: IHttpMethodParams): Promise<Response> {
  return FetchRequest(params, 'put');
}

function Delete(params: IHttpMethodParams): Promise<Response> {
  return FetchRequest(params, 'delete');
}

function Options(params: IHttpMethodParams): Promise<Response> {
  return FetchRequest(params, 'options');
}

const createInstance = (defaults: IDefaults) => {
  Defaults = defaults;

  return client;
}

export const client = {
  Get, Post, Put, Delete, Options, helpers, createInstance
};
