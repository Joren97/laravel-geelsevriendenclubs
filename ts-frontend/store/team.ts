import { Module, Mutation, Action } from 'vuex-module-decorators';
import  { TeamDto }  from '~/models/Team';
import { $axios } from '~/utils/api';
import BaseModule from './base';

@Module({ name: 'team', stateFactory: true, namespaced: true })
export default class TeamModule extends BaseModule<TeamDto, TeamDto, TeamDto> {
    RESOURCE = '/api/team'
    scoreBoard: any = [];

    @Action
  async getAll() {
    await super.getAll();
  }

  @Action
  async create(obj: TeamDto) {
    await super.create(obj);
  }

  @Action
  async get(id: string) {
    await super.get(id);
  }

  @Action
  async delete(id: string) {
    await super.delete(id);
  }

  @Action
  async update(obj: TeamDto) {
    return await super.update(obj);
  }

    @Mutation
    setScoreboard(value: any): void {
        this.scoreBoard = value;
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
