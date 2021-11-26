const RESOURCE = '/services/app/suspension';

const initialState = {
  loading: false,
  suspensions: [],
  currentSuspension: null,
  total: 0,
  page: '1',
  perPage: '10',
};

export const state = () => initialState;

export const mutations = {
  setLoading(state, value = true) {
    state.loading = value;
  },
  setSuspensions(state, value) {
    state.loading = false;
    state.total = value.totalCount;
    state.suspensions = value.items;
  },
  setCurrentSuspension(state, value) {
    state.loading = false;
    state.currentSuspension = value;
  },
  setQueryParams(state, params) {
    if (params.page) state.page = params.page;
  },
};

export const actions = {
  async get({ commit }, params) {
    try {
      commit('setLoading');
      let {
        data: { result },
      } = await this.$axios.get(`${RESOURCE}/get?id=${params}`);
      commit('setCurrentSuspension', result);
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
      commit('setSuspensions', { totalCount, items });
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async getAll({ commit, state }, params) {
    try {
      commit('setLoading');
      let skipCount = (parseInt(state.page) - 1) * parseInt(state.perPage);
      let teamId = params && params.teamId ? `&teamId=${params.teamId}` : '';

      let {
        data: {
          result: { totalCount, items },
        },
      } = await this.$axios.get(
        `${RESOURCE}/getAll?skipCount=${skipCount}&maxResultCount=${state.perPage}` +
          `${teamId}`,
      );
      commit('setSuspensions', { totalCount, items });
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async create({ commit }, params) {
    try {
      commit('setLoading');
      await this.$axios.post(`${RESOURCE}/createSuspension`, params);
      commit('setRequestSuccess', 'Suspension werd toegevoegd.', {
        root: true,
      });
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
      commit('setRequestSuccess', 'Suspension werd verwijderd.', {
        root: true,
      });
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
      commit('setRequestSuccess', 'Suspension werd opgeslagen.', {
        root: true,
      });
      commit('setLoading', false);
      dispatch('getAll');
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
};

export const getters = {};
