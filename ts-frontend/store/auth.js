const RESOURCE = '/tokenauth';

const initialState = {
  user: null,
  loading: false,
};

export const state = () => initialState;

export const mutations = {
  setLoading(state, value = true) {
    state.error = null;
    state.loading = value;
  },
  setUser(state, value) {
    state.user = value;
    state.loading = false;
    state.error = null;
  },
};

export const actions = {
  async login({ commit }, params) {
    try {
      commit('setLoading');
      let {
        data: {
          result: { accessToken, expireInSeconds },
        },
      } = await this.$axios.post(`${RESOURCE}/authenticate`, params);
      this.$cookies.set('sessionToken', accessToken, {
        path: '/',
        maxAge: expireInSeconds,
      });
      this.$router.push('/admin');
    } catch (error) {
      commit('setRequestError', error, { root: true });
      commit('setLoading', false);
    }
  },
};
