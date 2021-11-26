import { Getter } from 'vuex-class';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import  Game  from '~/models/Game';
import { $axios } from '~/utils/api';

const RESOURCE = '/api/games';


@Module({ name: 'game', stateFactory: true, namespaced: true })
export default class GameModule extends VuexModule {
    loading: boolean = false
    error: string | null = ''
    games: Game[] = []
    lastWeekGames: Game[] = []
    nextWeekGames: Game[] = []

    @Mutation
    setGames(value: Game[]) {
        this.games = value;
    }

    @Mutation
    setLastWeekGames(value: Game[]) {
        this.lastWeekGames = value;
    }

    @Mutation
    setNextWeekGames(value: Game[]) {
        this.nextWeekGames = value;
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

    @Action({rawError: true})
    async get(){
        try {
            this.setLoading(true);
            let {data: {data, current_page, per_page, total}}= await $axios.get(`${RESOURCE}`);            
            this.setGames(data);            
            this.setLoading(false);
          } catch (error) {
            this.setError();
          }
    }

    @Action({rawError: true})
    async getLastWeekGames(params: {from: string, till: string}){
        try {
            this.setLoading(true);
            let {data: {data, current_page, per_page, total}}= await $axios.get(`${RESOURCE}?from=${params.from}&till=${params.till}`);            
            this.setLastWeekGames(data);            
            this.setLoading(false);
          } catch (error) {
            this.setError();
          }
    }

    @Action({rawError: true})
    async getNextWeekGames(params: {from: string, till: string}){
        try {
            this.setLoading(true);
            let {data: {data, current_page, per_page, total}}= await $axios.get(`${RESOURCE}?from=${params.from}&till=${params.till}`);    
            this.setNextWeekGames(data);      
            this.setLoading(false);
          } catch (error) {
            this.setError();
          }
    }
}
