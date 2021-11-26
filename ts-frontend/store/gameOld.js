import moment from 'moment';
const RESOURCE = '/services/app/game';

const initialState = {
  loading: false,
  games: [],
  currentGame: null,
  total: 0,
  page: '1',
  perPage: '10',
  filterDates: [],
  lastWeekGames: [],
  nextWeekGames: [],
};

export const state = () => initialState;

export const mutations = {
  setLoading(state, value = true) {
    state.loading = value;
  },
  setGames(state, value) {
    state.loading = false;
    state.total = value.totalCount;
    state.games = value.items;
  },
  setLastWeekGames(state, value) {
    state.lastWeekGames = value.items;
  },
  setNextWeekGames(state, value) {
    state.nextWeekGames = value.items;
  },
  setCurrentGame(state, value) {
    state.loading = false;
    state.currentGame = value;
  },
  setUpdatedGame(state, value) {
    let index = state.games.findIndex((x) => x.id == value.id);
    state.games.splice(index, 1, value);
  },
  setQueryParams(state, params) {
    state.filterDates[0] = moment().startOf('month');
    state.filterDates[1] = moment().endOf('month');
    if (params.page) state.page = params.page;
    if (params.from) state.filterDates[0] = params.from;
    if (params.till) state.filterDates[1] = params.till;
  },
};

export const actions = {
  async get({ commit }, params) {
    try {
      commit('setLoading');
      let {
        data: { result },
      } = await this.$axios.get(`${RESOURCE}/get?id=${params}`);
      commit('setCurrentGame', result);
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async getLastWeekGames({ commit }, params) {
    try {
      let {
        data: {
          result: { totalCount, items },
        },
      } = await this.$axios.get(
        `${RESOURCE}/getAll?` +
          `&from=${params.from}` +
          `&till=${params.till}` +
          '&sorting=datetime',
      );
      commit('setLastWeekGames', { totalCount, items });
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async getNextWeekGames({ commit }, params) {
    try {
      let {
        data: {
          result: { totalCount, items },
        },
      } = await this.$axios.get(
        `${RESOURCE}/getAll?` +
          `&from=${params.from}` +
          `&till=${params.till}` +
          '&sorting=datetime',
      );
      commit('setNextWeekGames', { totalCount, items });
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async getAll({ commit, state }) {
    try {
      commit('setLoading');
      let skipCount = (state.page - 1) * state.perPage;
      let from =
        state.filterDates.length > 1
          ? moment(state.filterDates[0]).format('YYYY-MM-DD')
          : '';
      let till =
        state.filterDates.length > 1
          ? moment(state.filterDates[1]).format('YYYY-MM-DD')
          : '';

      let {
        data: {
          result: { totalCount, items },
        },
      } = await this.$axios.get(
        `${RESOURCE}/getAll?` +
          `skipCount=${skipCount}` +
          `&maxResultCount=${state.perPage}` +
          `&from=${from}` +
          `&till=${till}` +
          '&sorting=datetime',
      );
      commit('setGames', { totalCount, items });
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async create({ commit }, params) {
    try {
      commit('setLoading');
      await this.$axios.post(`${RESOURCE}/create`, params);
      commit('setRequestSuccess', 'Game werd toegevoegd.', { root: true });
      commit('setLoading', false);
      this.$router.go(-1);
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async delete({ commit, dispatch }, params) {
    try {
      commit('setLoading');
      await this.$axios.delete(`${RESOURCE}/delete?id=${params}`);
      commit('setRequestSuccess', 'Game werd verwijderd.', { root: true });
      commit('setLoading', false);
      dispatch('getAll');
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async update({ commit }, params) {
    try {
      commit('setLoading');
      let {
        data: { result },
      } = await this.$axios.put(`${RESOURCE}/update`, params);
      commit('setRequestSuccess', 'Game werd opgeslagen.', { root: true });
      commit('setUpdatedGame', result);
      commit('setLoading', false);
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
};

export const getters = {
  gamesForDropdown: (state) => {
    return state.games;
  },
};
