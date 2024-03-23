export interface CarInterface {
  name: string;
  color: string;
  id?: number;
}

export interface WinnerInterface {
  id: number;
  wins: number;
  time: number;
}

export interface WinnersQueryParamsInterface {
  page?: number;
  limit?: number;
  sort?: 'id' | 'wins' | 'time';
  order?: 'DESC' | 'ASC';
}

export interface EngineInterface {
  id: number;
  status: 'started' | 'stopped' | 'drive';
}

export interface EngineCarDataInterface {
  velocity: number;
  distance: number;
}

export interface EngineCarDriveInterface {
  success?: boolean;
}
