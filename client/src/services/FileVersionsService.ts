import url from "./url";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { File } from "../types/File.interface";

const server: AxiosInstance = axios.create({
  baseURL: url.url,
});
export default {
  fetchFileVersions(): Promise<AxiosResponse> {
    return server.get("fileVersions");
  },
  createFileInFileVersion(id: string, file: File): Promise<AxiosResponse> {
    return server.post(`fileVersions/${id}/files`, file);
  },
  // fetchFileVersion(id: string): Promise<AxiosResponse> {
  //   return server.get(`fileVersions/${id}`);
  // },
  createFileVersion(title: string): Promise<AxiosResponse> {
    return server.post("fileVersions", title);
  },
  deleteFileVersion(id: string): Promise<AxiosResponse> {
    return server.delete(`fileVersions/${id}`);
  },
};
