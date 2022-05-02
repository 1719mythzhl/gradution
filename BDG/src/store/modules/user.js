const state = {
    token: '',
    name: ''
  };
  
  const mutations = {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name
    }
  };
  const actions = {};
  
  export default {
    state,
    mutations,
    actions
  };
  