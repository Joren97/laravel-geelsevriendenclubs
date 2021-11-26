import  Team  from '~/models/Team';
export default interface Game {
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