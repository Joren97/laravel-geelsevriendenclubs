import { PersonDto } from './Person';
export interface TeamDto {
    id: number,
    name: string,
    address: string,
    city: string,
    postalCode: string,
    people: Array<PersonDto>
    pivot: {
        game_id: number,
        team_id: number,
        goalsScored: number,
        isHomeTeam: boolean
    },
    icon: string
}