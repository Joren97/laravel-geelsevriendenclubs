import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import  Team  from '~/models/Team';
import { $axios } from '~/utils/api';

const RESOURCE = '/api/teams';

@Module({ name: 'team', stateFactory: true, namespaced: true })
export default class TeamModule extends VuexModule {
    loading: boolean = false
    error: string | null = ''
    teams: Team[] = []
    scoreBoard: any = [];

    @Mutation
    setTeams(value: Team[]) {
        this.teams = value;
        this.loading = false;
        this.error = null;
    }

    @Mutation
    setError(value: string | null = 'An unknown error occured'): void {
        this.loading = false;
        this.error = value;
    }

    @Mutation
    setLoading(value: boolean): void {
        this.loading = value;
    }

    @Mutation
    setScoreboard(value: any): void {
        this.scoreBoard = value;
    }

    @Action({rawError: true})
    async get(){
        try {
            this.setLoading(true);
            console.log($axios);
            
            const {data} = await $axios.get(`${RESOURCE}`);
            this.setTeams(data)
            console.log(data);
            this.setLoading(false);
          } catch (err) {
              console.log(err);
            this.setError();
          }
    }

    @Action({rawError: true})
    async getScoreboard(isSmall: boolean = false) {
        try {
            this.setLoading(true);
            let {data}= await $axios.get(`/api/scoreboard?isSmall=${isSmall}`);    
            this.setScoreboard(data);
            this.setLoading(false);
        } catch (error) {
            this.setError();
        }
      }
}
