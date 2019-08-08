import Vue from 'vue';
import Vuex from 'vuex';
import * as ApplicationSettings from "application-settings";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fridge: [],
    pantry: [],
  },
  mutations: {
    load(state) {
      if(ApplicationSettings.getString("store")) {
          this.replaceState(
              Object.assign(state, JSON.parse(ApplicationSettings.getString("store")))
          );
      }
    },

    addToPantry(state, data) {
      state.pantry.unshift(data);
      ApplicationSettings.setString("store", JSON.stringify(state));
    },
    
    removeFromPantry(state, data) {
      const index = state.pantry.indexOf(data);
      state.pantry.splice(index, 1);
      ApplicationSettings.setString("store", JSON.stringify(state));
    }
  },
  actions: {
  }
});