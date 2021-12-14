import { ActionTree, createStore, MutationTree } from "vuex";
import { RootState } from "../types/Store.interface";
import * as fileversions from "./modules/fileversions";

export default createStore({
  state: {} as RootState,
  mutations: {} as MutationTree<RootState>,
  actions: {} as ActionTree<RootState, RootState>,
  modules: { fileversions: fileversions },
});
