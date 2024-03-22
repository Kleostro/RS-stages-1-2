import {
  API_ERRORS,
  API_METHODS,
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
  ): Promise<CarInterface[] | null> {
    const pageParam =
      params.get(QUERY_PARAMS.PAGE) ?? QUERY_VALUES.DEFAULT_PAGE;
    const limitParam =
      params.get(QUERY_PARAMS.LIMIT) ?? QUERY_VALUES.DEFAULT_CARS_LIMIT;
    const url = `${API_URLS.CARS}?${QUERY_PARAMS.PAGE}=${pageParam}&${QUERY_PARAMS.LIMIT}=${limitParam}`;
    return this.fetchData<CarInterface[]>(url, API_METHODS.GET);
  }

  public static async getCarById(id: string): Promise<CarInterface | null> {
    const url = `${API_URLS.CARS}${id}`;
    return this.fetchData<CarInterface>(url, API_METHODS.GET);
  }

  public static async getWinners(
    params: Map<string, WinnersQueryParamsInterface>,
  ): Promise<WinnerInterface[] | null> {
    const pageParam = Number(
      params.get(QUERY_PARAMS.PAGE) ?? QUERY_VALUES.DEFAULT_PAGE,
    );
    const limitParam = Number(
      params.get(QUERY_PARAMS.LIMIT) ?? QUERY_VALUES.DEFAULT_WINNERS_LIMIT,
    );
    const sortParam = String(params.get(QUERY_PARAMS.SORT) ?? QUERY_VALUES.ID);
    const orderParam = String(
      params.get(QUERY_PARAMS.ORDER) ?? QUERY_VALUES.ASC,
    );

    const url = `${API_URLS.WINNERS}?${QUERY_PARAMS.PAGE}=${pageParam}&${QUERY_PARAMS.LIMIT}=${limitParam}&${QUERY_PARAMS.SORT}=${sortParam}&${QUERY_PARAMS.ORDER}=${orderParam}`;
    return this.fetchData<WinnerInterface[]>(url, API_METHODS.GET);
  }

  public static async getWinnerById(
    id: string,
  ): Promise<WinnerInterface | null> {
    const url = `${API_URLS.WINNERS}${id}`;
    return this.fetchData<WinnerInterface>(url, API_METHODS.GET);
  }

  public static async createCar(
    car: CarInterface,
  ): Promise<CarInterface | null> {
    const url = API_URLS.CARS;
    return this.fetchData<CarInterface>(url, API_METHODS.POST, car);
  }

  public static async createWinner(
    winner: WinnerInterface,
  ): Promise<WinnerInterface | null> {
    const url = API_URLS.WINNERS;
    return this.fetchData<WinnerInterface>(url, API_METHODS.POST, winner);
  }

  public static async deleteCarById(id: string): Promise<CarInterface | null> {
    const url = `${API_URLS.CARS}${id}`;
    return this.fetchData<CarInterface>(url, API_METHODS.DELETE);
  }

  public static async deleteWinnerById(
    id: string,
  ): Promise<WinnerInterface | null> {
    const url = `${API_URLS.WINNERS}${id}`;
    return this.fetchData<WinnerInterface>(url, API_METHODS.DELETE);
  }

  public static async updateCarById(
    id: string,
    car: CarInterface,
  ): Promise<CarInterface | null> {
    const url = `${API_URLS.CARS}${id}`;
    return this.fetchData<CarInterface>(url, API_METHODS.PUT, car);
  }

  public static async updateWinnerById(
    id: string,
    winner: WinnerInterface,
  ): Promise<WinnerInterface | null> {
    const url = `${API_URLS.WINNERS}${id}`;
    return this.fetchData<WinnerInterface>(url, API_METHODS.PUT, winner);
  }

  public static async startCarEngine(
    params: Map<string, EngineInterface>,
  ): Promise<EngineCarDataInterface | null> {
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
  ): Promise<EngineCarDataInterface | null> {
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
  ): Promise<EngineCarDriveInterface | null> {
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
  ): Promise<T | null> {
    const data: T | null = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : null,
    })
      .then((response) => response.json())
      .then((json: T) => json)
      .catch(() => null);
    return data;
  }
}

export default ApiModel;
