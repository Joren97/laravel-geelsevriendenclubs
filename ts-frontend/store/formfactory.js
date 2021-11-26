const getInitialState = () => {
  return {
    validations: {},
    backendError: {},
  };
};

export const state = () => getInitialState();

export const mutations = {
  setValidations(state, value) {
    state.validations = { ...state.validations, ...value };
  },
  setBackendError(state, value) {
    state.backendError = value;
  },
  resetStateData(state) {
    Object.assign(state, getInitialState());
  },
};

export const actions = {};
