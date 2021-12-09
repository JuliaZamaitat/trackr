import FileVersionsService from "../../../services/FileVersionsService.js";

export const namespaced = true;

export const state = {
  fileVersions: [],
  fileVersion: {},
};

export const mutations = {
  SET_FILE_VERSIONS(state, fileVersions) {
    state.fileVersions = fileVersions;
  },
  SET_FILE_VERSION(state, fileVersion) {
    state.fileVersion = fileVersion;
  },
  SET_PENDING(state, status) {
    state.pending = status;
  },
};

export const actions = {
  async fetchFileVersion({ commit }, { id }) {
    try {
      commit("SET_PENDING", true);
      var fileVersion = getters.getFileVersionById(id);
      if (!fileVersion) {
        await FileVersionsService.fetchFileVersion(id)
          .then((response) => {
            let filVersions = state.fileVersions | [];
            filVersions.push(response.data);
            commit("SET_FILE_VERSIONS", filVersions);
            commit("SET_FILE_VERSION", response.data);
          })
          .catch(async (error) => {
            const notification = {
              type: "error",
              message:
                "There was a problem fetching fileVersion with id " +
                id +
                ": " +
                error.message,
            };
            console.log(notification);
          });
      } else {
        commit("SET_FILE_VERSION", fileVersion);
      }
    } finally {
      commit("SET_PENDING", false);
    }
  },
  async fetchFileVersions({ commit }) {
    try {
      commit("SET_PENDING", true);

      await FileVersionsService.fetchFileVersions
        .then((response) => {
          let filVersions = state.fileVersions | [];
          filVersions.push(response.data);
          commit("SET_FILE_VERSIONS", filVersions);
        })
        .catch(async (error) => {
          const notification = {
            type: "error",
            message:
              "There was a problem fetching fileVersions: " + error.message,
          };
          console.log(notification);
        });
    } finally {
      commit("SET_PENDING", false);
    }
  },
  async createFileVersion({ state, commit }, { formData }) {
    try {
      commit("SET_PENDING", true);
      await FileVersionsService.createFileVersion(formData).then((response) => {
        let filVersions = state.fileVersions | [];
        filVersions.push(response.data);
        commit("SET_FILE_VERSIONS", filVersions);
        commit("SET_FILE_VERSION", response.data);
      });
    } catch (error) {
      const notification = {
        type: "error",
        message: "There was a problem creating a fileVersion: " + error.message,
      };
      console.log(notification);
    } finally {
      commit("SET_PENDING", false);
    }
  },
};

export const getters = {
  getFileVersionById: (state) => (id) => {
    if (!state.fileVersions) return;
    return state.fileVersions.find((version) => version.id === id);
  },
};
