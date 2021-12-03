export default interface Team {
    id: number,
    name: string,
    pivot: {
        game_id: number,
        team_id: number,
        goalsScored: number,
        isHomeTeam: boolean
    },
    icon: string
}