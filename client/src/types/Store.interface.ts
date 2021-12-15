import { FileVersions } from "./FileVersions.interface";

export interface FileVersionsState {
  fileVersions?: FileVersions[];
  fileVersion?: FileVersions;
  pending?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {}
