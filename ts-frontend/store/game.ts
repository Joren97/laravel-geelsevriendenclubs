import { Module, Mutation, Action } from 'vuex-module-decorators';
import { GameDto, CreateGameDto, UpdateGameDto } from '~/models/Game';
import { $axios } from '~/utils/api';
import BaseModule from './base';

@Module({ name: 'game', stateFactory: true, namespaced: true })
export default class GameModule extends BaseModule<GameDto, CreateGameDto, UpdateGameDto> {
  lastWeekGames: GameDto[] = []
  nextWeekGames: GameDto[] = []
  RESOURCE = '/api/game';
  filterDates: string[] = ['', ''];

  @Mutation
  setLastWeekGames(value: GameDto[]) {
    this.lastWeekGames = value;
  }

  @Mutation
  setNextWeekGames(value: GameDto[]) {
    this.nextWeekGames = value;
  }

  @Mutation
  setFromDate(value: string) {
    this.filterDates[0] = value;
  }

  @Mutation
  setTillDate(value: string) {
    this.filterDates[1] = value;
  }

  @Action
  async getAll() {
    await super.getAll({
      extra: `?from=${this.filterDates[0]}&till=${this.filterDates[1]}`
    });
  }

  @Action
  async create(obj: CreateGameDto) {
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
  async update(obj: UpdateGameDto) {
    return await super.update(obj);
  }

  @Action({ rawError: true })
  async getLastWeekGames(params: { from: string, till: string }) {
    try {
      this.setLoading(true);
      let { data: { data, current_page, per_page, total } } = await $axios.get(`${this.RESOURCE}?from=${params.from}&till=${params.till}`);
      this.setLastWeekGames(data);
      this.setLoading(false);
    } catch (error) {
      this.setError();
    }
  }

  @Action({ rawError: true })
  async getNextWeekGames(params: { from: string, till: string }) {
    try {
      this.setLoading(true);
      let { data: { data, current_page, per_page, total } } = await $axios.get(`${this.RESOURCE}?from=${params.from}&till=${params.till}`);
      this.setNextWeekGames(data);
      this.setLoading(false);
    } catch (error) {
      this.setError();
    }
  }
}
