import firebase from "firebase";

export default {
  state: {},
  mutations: {},
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },

    async registr({ dispatch, commit }, { email, password, name, users }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        const uid = await dispatch("getUid");

        let date = new Date();
        let day;
        if (date.getDate().toString().length === 1) {
          day = "0" + date.getDate();
        } else {
          day = date.getDate();
        }
        let month;
        if (date.getMonth().toString().length === 1) {
          month = "0" + date.getMonth();
        } else {
          month = date.getMonth();
        }
        let year = date.getFullYear();
        let dateCreate = `${day}.${month}.${year}`;

        const user = {
          id: uid,
          date: dateCreate,
          birth: "",
          email: email,
          phone: "",
          firstname: "",
          lastname: "",
          nickname: name,
          city: "",
          mailing: false,
          adress: "",
          password: password,
          cardNumber: "",
          sex: ""
        };

        users[users.length] = user;
        await firebase
          .database()
          .ref("users")
          .set(users);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },

    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },

    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    }
  },
  modules: {}
};
