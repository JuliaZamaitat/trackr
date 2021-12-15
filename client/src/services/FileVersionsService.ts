import url from "./url";
import axios, { AxiosInstance, AxiosResponse } from "axios";

const server: AxiosInstance = axios.create({
  baseURL: url.url,
});
export default {
  fetchFileVersions(): Promise<AxiosResponse> {
    return server.get("fileVersions");
  },
  fetchFileVersion(id: string): Promise<AxiosResponse> {
    return server.get(`fileVersions/${id}`);
  },
  createFileVersion(version: string): Promise<AxiosResponse> {
    return server.post("fileVersion", version);
  },
};
