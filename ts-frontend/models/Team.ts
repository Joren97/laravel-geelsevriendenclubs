export interface TeamDto {
    id: number,
    name: string,
    address: string,
    city: string,
    postalCode: string,
    pivot: {
        game_id: number,
        team_id: number,
        goalsScored: number,
        isHomeTeam: boolean
    },
    icon: string
}