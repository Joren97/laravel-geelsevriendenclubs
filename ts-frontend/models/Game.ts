import  Team  from '~/models/Team';
export interface GameDto {
    id: number,
    homeTeamId: number,
    outTeamId: number,
    homeTeamScore: number,
    outTeamScore: number,
    dateTime: Date,
    isCup: boolean,
    isCancelled: boolean,
    created_at: Date,
    updated_at: Date,
    teams: Team[]
}

export interface CreateGameDto {
    id: number,
    homeTeamId: number,
    outTeamId: number,
    homeTeamScore: number,
    outTeamScore: number,
    dateTime: Date,
    isCup: boolean,
    isCancelled: boolean,
    created_at: Date,
    updated_at: Date,
    teams: Team[]
}

export interface UpdateGameDto {
    id: number,
    homeTeamId: number,
    outTeamId: number,
    homeTeamScore: number,
    outTeamScore: number,
    dateTime: Date,
    isCup: boolean,
    isCancelled: boolean,
    created_at: Date,
    updated_at: Date,
    teams: Team[]
}