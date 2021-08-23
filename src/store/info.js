import firebase from "firebase";

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const user = (
          await firebase
            .database()
            .ref("users")
            .once("value")
        )
          .val()
          .filter(user => {
            return user.id === uid;
          });

        commit("setInfo", user[0]);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    }
  },
  getters: {
    info: s => s.info
  }
};
