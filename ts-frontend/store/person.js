const RESOURCE = '/services/app/person';

const initialState = {
  loading: false,
  persons: [],
  currentPerson: null,
  total: 0,
  page: '1',
  perPage: '10',
  searchString: '',
};

export const state = () => initialState;

export const mutations = {
  setLoading(state, value = true) {
    state.loading = value;
  },
  setPersons(state, value) {
    state.loading = false;
    state.total = value.totalCount;
    state.persons = value.items;
  },
  setCurrentPerson(state, value) {
    state.loading = false;
    state.currentPerson = value;
  },
  setQueryParams(state, params) {
    if (!params) return;
    if (params.page) state.page = params.page;
    if (params.searchString) state.searchString = params.searchString;
    else state.searchString = '';
  },
};

export const actions = {
  async get({ commit }, params) {
    try {
      commit('setLoading');
      let {
        data: { result },
      } = await this.$axios.get(`${RESOURCE}/get?id=${params}`);
      commit('setCurrentPerson', result);
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async getAll({ state, commit }) {
    try {
      commit('setLoading');
      let skipCount = (parseInt(state.page) - 1) * parseInt(state.perPage);

      let {
        data: {
          result: { totalCount, items },
        },
      } = await this.$axios.get(
        `${RESOURCE}/getAll?name=${state.searchString}` +
          `&skipCount=${skipCount}&maxResultCount=${state.perPage}`,
      );
      commit('setPersons', { totalCount, items });
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
  async create({ commit }, params) {
    try {
      commit('setLoading');
      await this.$axios.post(`${RESOURCE}/create`, params);
      commit('setRequestSuccess', 'Persoon werd toegevoegd.', { root: true });
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
      commit('setRequestSuccess', 'Persoon werd verwijderd.', { root: true });
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
      commit('setRequestSuccess', 'Persoon werd opgeslagen.', { root: true });
      commit('setLoading', false);
      dispatch('getAll');
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
};
