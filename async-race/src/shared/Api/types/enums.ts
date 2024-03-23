export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export const QUERY_PARAMS = {
  PAGE: '_page',
  LIMIT: '_limit',
  SORT: '_sort',
  ORDER: '_order',
  ID: 'id',
  STATUS: 'status',
} as const;

export const QUERY_VALUES = {
  ASC: 'asc',
  DESC: 'desc',
  WINS: 'wins',
  TIME: 'time',
  ID: 'id',
  DEFAULT_PAGE: 1,
  DEFAULT_CARS_LIMIT: 7,
  DEFAULT_WINNERS_LIMIT: 10,
  NO_CARS_LIMIT: 0,
  NO_WINNERS_LIMIT: 0,
} as const;

export const API_URLS = {
  CARS: 'http://127.0.0.1:3000/garage/',
  WINNERS: 'http://127.0.0.1:3000/winners/',
  ENGINE: 'http://127.0.0.1:3000/engine/',
} as const;

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const API_ERRORS = {
  INCORRECT_PARAMS: 'Incorrect params',
};
