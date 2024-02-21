import { Requests, RequestsErrors } from '@/enums';
import type { getRespInterface, Response } from '@/types';

interface LoaderInterface {
  getResp({ endpoint, options }: getRespInterface, callback: () => void): void;
  errorHandler(res: Response): Response;
  makeUrl(options: getRespInterface['options'], endpoint: getRespInterface['endpoint']): string;
  load(method: Requests, endpoint: getRespInterface['endpoint'], callback: (data: Response) => void): void;
}

class Loader implements LoaderInterface {
  private baseLink: string;
  private options: Record<string, string>;
  constructor(baseLink: string, options: Record<string, string>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp(
    { endpoint, options = {} }: getRespInterface,
    callback = (): void => {
      console.error('No callback for GET response');
    },
  ): void {
    this.load(Requests.GET, endpoint, callback, options);
  }

  public errorHandler(res: Response): Response {
    if (!res.ok) {
      const statusEnum: RequestsErrors = res.status;
      if (statusEnum === RequestsErrors.UNAUTHORIZED || statusEnum === RequestsErrors.NOT_FOUND) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }

    return res;
  }

  public makeUrl(options: getRespInterface['options'], endpoint: getRespInterface['endpoint']): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  public load(
    method: Requests,
    endpoint: getRespInterface['endpoint'],
    callback: (data: Response) => void,
    options: getRespInterface['options'] = {},
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler.bind(this))
      .then((res) => res.json())
      .then((data: Response) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
