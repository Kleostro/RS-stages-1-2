import { Requests, RequestsErrors } from '@/types/enums';
import type { getRespInterface, ResponseSourcesInterface } from '@/types/interfaces';

interface LoaderInterface {
  getResp({ endpoint, options }: getRespInterface, callback: (data: ResponseSourcesInterface) => void): void;
  errorHandler(res: Response): Response;
  makeUrl(options: getRespInterface['options'], endpoint: getRespInterface['endpoint']): string;
  load(
    method: Requests,
    endpoint: getRespInterface['endpoint'],
    callback: (data: ResponseSourcesInterface) => void,
  ): void;
}

class Loader implements LoaderInterface {
  private baseLink;
  private options;
  constructor(baseLink: string, options: Record<string, string>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp(
    { endpoint, options = {} }: getRespInterface,
    callback: (data: ResponseSourcesInterface) => void = (): void => {
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

    Object.keys(urlOptions).forEach((key): void => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  public load(
    method: Requests,
    endpoint: getRespInterface['endpoint'],
    callback: (data: ResponseSourcesInterface) => void,
    options: getRespInterface['options'] = {},
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler.bind(this))
      .then((res): Promise<ResponseSourcesInterface> => res.json())
      .then((data: ResponseSourcesInterface) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
