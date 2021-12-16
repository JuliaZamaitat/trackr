import { FileVersions } from "@/src/types/FileVersions.interface";
import FileVersionsService from "../../services/FileVersionsService";
import { AxiosError, AxiosResponse } from "axios";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { FileVersionsState, RootState } from "../../types/Store.interface";

export const namespaced = true;

export const state: FileVersionsState = {
  fileVersions: [],
  fileVersion: {},
  pending: false,
};

export enum FileVersionsMutations {
  SET_FILE_VERSIONS = "SET_FILE_VERSIONS",
  SET_FILE_VERSION = "SET_FILE_VERSION",
  SET_PENDING = "SET_PENDING",
}

export const mutations: MutationTree<FileVersionsState> = {
  [FileVersionsMutations.SET_FILE_VERSIONS](
    state,
    fileVersions: FileVersions[]
  ) {
    state.fileVersions = fileVersions;
  },
  [FileVersionsMutations.SET_FILE_VERSION](state, fileVersion: FileVersions) {
    state.fileVersion = fileVersion;
  },
  [FileVersionsMutations.SET_PENDING](state, status: boolean) {
    state.pending = status;
  },
};

export const actions: ActionTree<FileVersionsState, RootState> = {
  // async fetchFileVersion({ state, commit }, id: string): Promise<void> {
  //   try {
  //     commit(FileVersionsMutations.SET_PENDING, true);
  //     const fileVersion: FileVersions | undefined = state.fileVersions?.find(
  //       (version) => version._id === id
  //     );
  //     if (!fileVersion) {
  //       await FileVersionsService.fetchFileVersion(id)
  //         .then((response: AxiosResponse) => {
  //           const fileVersions = state.fileVersions;
  //           if (!fileVersions) return;
  //           fileVersions.push(response.data[0]);
  //           commit(FileVersionsMutations.SET_FILE_VERSIONS, fileVersions);
  //           commit(FileVersionsMutations.SET_FILE_VERSION, response.data);
  //         })
  //         .catch(async (error: AxiosError) => {
  //           const notification = {
  //             type: "error",
  //             message:
  //               "There was a problem fetching fileVersion with id " +
  //               id +
  //               ": " +
  //               error.message,
  //           };
  //           console.log(notification);
  //         });
  //     } else {
  //       commit(FileVersionsMutations.SET_FILE_VERSION, fileVersion);
  //     }
  //   } finally {
  //     commit(FileVersionsMutations.SET_PENDING, false);
  //   }
  // },
  async fetchFileVersions({ commit }) {
    try {
      commit(FileVersionsMutations.SET_PENDING, true);
      commit(FileVersionsMutations.SET_FILE_VERSIONS, []);
      await FileVersionsService.fetchFileVersions()
        .then((response: AxiosResponse) => {
          let fileVersions = state.fileVersions;
          if (!fileVersions) return;
          fileVersions = response.data;
          commit(FileVersionsMutations.SET_FILE_VERSIONS, fileVersions);
        })
        .catch(async (error: AxiosError) => {
          const notification = {
            type: "error",
            message:
              "There was a problem fetching fileVersions: " + error.message,
          };
          console.log(notification);
        });
    } finally {
      commit(FileVersionsMutations.SET_PENDING, false);
    }
  },
  async createFileVersion({ state, commit }, title) {
    try {
      commit(FileVersionsMutations.SET_PENDING, true);
      await FileVersionsService.createFileVersion(title)
        .then((response) => {
          const fileVersions = state.fileVersions;
          if (!fileVersions) return;
          fileVersions.push(response.data);
          commit(FileVersionsMutations.SET_FILE_VERSIONS, fileVersions);
          commit(FileVersionsMutations.SET_FILE_VERSION, response.data);
        })
        .catch(async (error: AxiosError) => {
          const notification = {
            type: "error",
            message:
              "There was a problem creating a fileVersion: " + error.message,
          };
          console.log(notification);
        });
    } finally {
      commit(FileVersionsMutations.SET_PENDING, false);
    }
  },
  async deleteFileVersion(
    { state, commit },
    payload: { id: string }
  ): Promise<void> {
    try {
      await FileVersionsService.deleteFileVersion(payload.id)
        .then((response: AxiosResponse) => {
          const fileVersions = state.fileVersions;
          if (!fileVersions) return;
          fileVersions.splice(fileVersions.indexOf(response.data), 1);
          commit(FileVersionsMutations.SET_FILE_VERSIONS, fileVersions);
          commit(FileVersionsMutations.SET_FILE_VERSION, response.data);
        })
        .catch(async (error: AxiosError) => {
          const notification = {
            type: "error",
            message:
              "There was a problem deleting fileVersion with id " +
              payload.id +
              ": " +
              error.message,
          };
          console.log(notification);
        });
    } finally {
      commit(FileVersionsMutations.SET_PENDING, false);
    }
  },
  async addFileToFileVersion(
    { state, commit },
    payload: { id: string; file: FileVersions }
  ): Promise<void> {
    try {
      await FileVersionsService.createFileInFileVersion(
        payload.id,
        payload.file
      )
        .then((response: AxiosResponse) => {
          const fileVersions = state.fileVersions;
          if (!fileVersions) return;
          fileVersions.splice(fileVersions.indexOf(response.data), 1);
          fileVersions.push(response.data);
          commit(FileVersionsMutations.SET_FILE_VERSIONS, fileVersions);
          commit(FileVersionsMutations.SET_FILE_VERSION, response.data);
        })
        .catch(async (error: AxiosError) => {
          const notification = {
            type: "error",
            message:
              "There was a problem creating a file for fileVersion with id " +
              payload.id +
              ": " +
              error.message,
          };
          console.log(notification);
        });
    } finally {
      commit(FileVersionsMutations.SET_PENDING, false);
    }
  },
};

export const getters: GetterTree<FileVersionsState, RootState> = {
  getFileVersionById: (state) => (id: string) => {
    return state.fileVersions?.find((f) => f._id == id);
  },
};
