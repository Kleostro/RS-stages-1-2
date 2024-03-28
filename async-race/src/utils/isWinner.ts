import type NewWinner from '../entities/RaceTrack/types/interfaces.ts';

class Winner implements NewWinner {
  public id?: number;

  public wins: number;

  public time: number;

  public name: string;

  constructor(name: string, wins: number, time: number, id?: number) {
    this.name = name;
    this.wins = wins;
    this.time = time;
    this.id = id;
  }

  public static isWinner = (winner: unknown): winner is Winner =>
    winner instanceof Winner;
}

export default Winner;
