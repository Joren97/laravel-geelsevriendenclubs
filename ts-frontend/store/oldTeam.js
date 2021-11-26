import { f } from '@/utils/enum.js';
const RESOURCE = '/services/app/team';

const initialState = {
  loading: false,
  teams: [],
  currentTeam: null,
  total: 0,
  page: '1',
  perPage: '10',
  scoreBoard: [],
};

export const state = () => initialState;

export const mutations = {
  setLoading(state, value = true) {
    state.loading = value;
  },
  setTeams(state, value) {
    state.loading = false;
    state.total = value.totalCount;
    state.teams = value.items;
  },
  setCurrentTeam(state, value) {
    state.loading = false;
    state.currentTeam = value;
  },
  setQueryParams(state, params) {
    if (params.page) state.page = params.page;
  },
  setScoreboard(state, value) {
    state.loading = false;
    state.scoreBoard = value;
  },
};

export const actions = {
  async get({ commit }, params) {
    try {
      commit('setLoading');
      let {
        data: { result },
      } = await this.$axios.get(`${RESOURCE}/get?id=${params}`);
      commit('setCurrentTeam', result);
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async getAllUnfiltered({ commit }) {
    try {
      commit('setLoading');
      let {
        data: {
          result: { totalCount, items },
        },
      } = await this.$axios.get(`${RESOURCE}/getAll?maxResultCount=999`);
      commit('setTeams', { totalCount, items });
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async getAll({ commit, state }) {
    try {
      commit('setLoading');
      let skipCount = (parseInt(state.page) - 1) * parseInt(state.perPage);

      let {
        data: {
          result: { totalCount, items },
        },
      } = await this.$axios.get(
        `${RESOURCE}/getAll?skipCount=${skipCount}&maxResultCount=${state.perPage}`,
      );
      commit('setTeams', { totalCount, items });
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async create({ commit }, params) {
    try {
      commit('setLoading');
      await this.$axios.post(`${RESOURCE}/create`, params);
      commit('setRequestSuccess', 'Team werd toegevoegd.', { root: true });
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
      commit('setRequestSuccess', 'Team werd verwijderd.', { root: true });
      commit('setLoading', false);
      dispatch('getAll');
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async update({ commit, dispatch }, params) {
    try {
      commit('setLoading');
      await this.$axios.put(`${RESOURCE}/update`, params);
      commit('setRequestSuccess', 'Team werd opgeslagen.', { root: true });
      commit('setLoading', false);
      dispatch('getAll');
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async getScoreboard({ commit }, isSmall = false) {
    try {
      commit('setLoading');
      let {
        data: { result },
      } = await this.$axios.get(`${RESOURCE}/getScoreboard?isSmall=${isSmall}`);
      commit('setScoreboard', result);
      commit('setLoading', false);
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
};

export const getters = {
  teamsForDropdown: (state) => {
    return state.teams;
  },
  playersInCurrentTeam: (state) => {
    if (!state.currentTeam) return null;
    return state.currentTeam.people.filter((x) => x.function == f.player);
  },
  contactInCurrentTeam: (state) => {
    if (!state.currentTeam) return null;
    return state.currentTeam.people.find((x) => x.function == f.contact);
  },
  presidentInCurrentTeam: (state) => {
    if (!state.currentTeam) return null;
    return state.currentTeam.people.find((x) => x.function == f.president);
  },
  secretaryInCurrentTeam: (state) => {
    if (!state.currentTeam) return null;
    return state.currentTeam.people.find((x) => x.function == f.secretary);
  },
};
