export interface Participant {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface GameDto {
  games: {
    id: string;
    score_team1: number;
    score_team2: number;
    team1: string;
    team2: string;
    round: string;
  }[];
}

export interface GetPoolDto {
  id: string;
  code: string;
  name: string;
  poolParticapantes: {
    id: string;
    user: Participant;
  }[];
}

export interface GuessesDto {
  id: string;
  points: number;
  name: string;
  image: string | null;
}

export interface PoolDto {
  pools: {
    id: string;
    code: string;
    name: string;
    userId: string;
    userName: string;
    poolParticapantes: {
      id: string;
      name: string;
      avatarUrl: string | null;
      userId: string;
    }[];
  }[];
}

export interface OneMatche {
  round: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  score?: {
    ft: number[];
  };
}
