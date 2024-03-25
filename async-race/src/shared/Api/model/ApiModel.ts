import {
  API_ERRORS,
  API_METHODS,
  API_HEADERS,
  API_URLS,
  QUERY_PARAMS,
  QUERY_VALUES,
} from '../types/enums.ts';
import type {
  CarInterface,
  EngineCarDataInterface,
  EngineCarDriveInterface,
  EngineInterface,
  WinnerInterface,
  WinnersQueryParamsInterface,
} from '../types/interfaces.ts';

class ApiModel {
  public static async getCars(
    params: Map<string, number>,
  ): Promise<CarInterface[] | undefined> {
    const pageParam = params.get(QUERY_PARAMS.PAGE);
    const limitParam = params.get(QUERY_PARAMS.LIMIT);

    let url = `${API_URLS.CARS}`;
    if (pageParam && limitParam) {
      url = `${API_URLS.CARS}?${QUERY_PARAMS.PAGE}=${pageParam}&${QUERY_PARAMS.LIMIT}=${limitParam}`;
    }
    return this.fetchData<CarInterface[]>(url, API_METHODS.GET);
  }

  public static async getCarById(
    id: number,
  ): Promise<CarInterface | undefined> {
    const url = `${API_URLS.CARS}${id}`;
    return this.fetchData<CarInterface>(url, API_METHODS.GET);
  }

  public static async getWinners(
    params: Map<string, WinnersQueryParamsInterface>,
  ): Promise<WinnerInterface[] | undefined> {
    const pageParam = Number(
      params.get(QUERY_PARAMS.PAGE) ?? QUERY_VALUES.DEFAULT_PAGE,
    );
    const limitParam = Number(
      params.get(QUERY_PARAMS.LIMIT) ?? QUERY_VALUES.NO_WINNERS_LIMIT,
    );
    const sortParam = String(params.get(QUERY_PARAMS.SORT) ?? QUERY_VALUES.ID);
    const orderParam = String(
      params.get(QUERY_PARAMS.ORDER) ?? QUERY_VALUES.ASC,
    );

    const url = `${API_URLS.WINNERS}?${QUERY_PARAMS.PAGE}=${pageParam}&${QUERY_PARAMS.LIMIT}=${limitParam}&${QUERY_PARAMS.SORT}=${sortParam}&${QUERY_PARAMS.ORDER}=${orderParam}`;
    return this.fetchData<WinnerInterface[]>(url, API_METHODS.GET);
  }

  public static async getWinnerById(
    id: number,
  ): Promise<WinnerInterface | undefined> {
    const url = `${API_URLS.WINNERS}${id}`;
    return this.fetchData<WinnerInterface>(url, API_METHODS.GET);
  }

  public static async createCar(
    car: CarInterface,
  ): Promise<CarInterface | undefined> {
    const url = API_URLS.CARS;
    return this.fetchData<CarInterface>(url, API_METHODS.POST, car);
  }

  public static async createWinner(
    winner: WinnerInterface,
  ): Promise<WinnerInterface | undefined> {
    const url = API_URLS.WINNERS;
    return this.fetchData<WinnerInterface>(url, API_METHODS.POST, winner);
  }

  public static async deleteCarById(
    id: number,
  ): Promise<CarInterface | undefined> {
    const url = `${API_URLS.CARS}${id}`;
    return this.fetchData<CarInterface>(url, API_METHODS.DELETE);
  }

  public static async deleteWinnerById(
    id: number,
  ): Promise<WinnerInterface | undefined> {
    const url = `${API_URLS.WINNERS}${id}`;
    return this.fetchData<WinnerInterface>(url, API_METHODS.DELETE);
  }

  public static async updateCarById(
    id: number,
    car: CarInterface,
  ): Promise<CarInterface | undefined> {
    const url = `${API_URLS.CARS}${id}`;
    return this.fetchData<CarInterface>(url, API_METHODS.PUT, car);
  }

  public static async updateWinnerById(
    id: number,
    winner: WinnerInterface,
  ): Promise<WinnerInterface | undefined> {
    const url = `${API_URLS.WINNERS}${id}`;
    return this.fetchData<WinnerInterface>(url, API_METHODS.PUT, winner);
  }

  public static async startCarEngine(
    params: Map<string, EngineInterface>,
  ): Promise<EngineCarDataInterface | undefined> {
    const idParam = Number(params.get(QUERY_PARAMS.ID));
    const statusParam = String(params.get(QUERY_PARAMS.STATUS));
    if (!idParam || !statusParam) {
      throw new Error(API_ERRORS.INCORRECT_PARAMS);
    }
    const url = `${API_URLS.ENGINE}?${QUERY_PARAMS.ID}=${idParam}/${QUERY_PARAMS.STATUS}=${statusParam}`;
    return this.fetchData<EngineCarDataInterface>(url, API_METHODS.PATCH);
  }

  public static async stopCarEngine(
    params: Map<string, EngineInterface>,
  ): Promise<EngineCarDataInterface | undefined> {
    const idParam = Number(params.get(QUERY_PARAMS.ID));
    const statusParam = String(params.get(QUERY_PARAMS.STATUS));
    if (!idParam || !statusParam) {
      throw new Error(API_ERRORS.INCORRECT_PARAMS);
    }
    const url = `${API_URLS.ENGINE}?${QUERY_PARAMS.ID}=${idParam}/${QUERY_PARAMS.STATUS}=${statusParam}`;
    return this.fetchData<EngineCarDataInterface>(url, API_METHODS.PATCH);
  }

  public static async driveCarEngine(
    params: Map<string, EngineInterface>,
  ): Promise<EngineCarDriveInterface | undefined> {
    const idParam = Number(params.get(QUERY_PARAMS.ID));
    const statusParam = String(params.get(QUERY_PARAMS.STATUS));
    if (!idParam || !statusParam) {
      throw new Error(API_ERRORS.INCORRECT_PARAMS);
    }
    const url = `${API_URLS.ENGINE}?${QUERY_PARAMS.ID}=${idParam}/${QUERY_PARAMS.STATUS}=${statusParam}`;
    return this.fetchData<EngineCarDriveInterface>(url, API_METHODS.PATCH);
  }

  private static async fetchData<T>(
    url: string,
    method: string,
    body?: T | null,
  ): Promise<T | undefined> {
    return fetch(url, {
      method,
      headers: {
        [API_HEADERS.CONTENT_TYPE]: API_HEADERS.APPLICATION_JSON,
      },
      body: body ? JSON.stringify(body) : null,
    })
      .then((response) => response.json())
      .then((json: T) => json)
      .catch(() => undefined);
  }
}

export default ApiModel;
