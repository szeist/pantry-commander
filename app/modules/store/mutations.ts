import * as ApplicationSettings from "tns-core-modules/application-settings";
import {Store} from './services/store';

const storeService = new Store('store');

const mutations = {
  load(state) {
    const data = storeService.getStore();
    if(data) {
        this.replaceState(
            Object.assign(state, data)
        );
        state.pantry.forEach(function(item) {
          item.expiry = new Date(item.expiry);
        });
    }
  },

  addToPantry(state, data) {
    state.pantry.unshift(data);
    storeService.setStore(state);
  },
  
  removeFromPantry(state, data) {
    const index = state.pantry.indexOf(data);
    if (index >= -1) {
      state.pantry.splice(index, 1);
      storeService.setStore(state);
    }
  }
}

export default mutations;
