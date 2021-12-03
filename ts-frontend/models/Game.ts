import {TeamDto}  from '~/models/Team';
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
    home_team: TeamDto,
    out_team: TeamDto
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
    updated_at: Date
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
    updated_at: Date
}