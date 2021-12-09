import url from "./url";
import axios from "axios";

const server = axios.create({
  baseURL: url.url,
});
export default {
  fetchFileVersions() {
    return server.get("fileVersions");
  },
  fetchFileVersion(id) {
    return server.get(`fileVersions/${id}`);
  },
  createFileVersion(version) {
    return server.post("fileVersion", version);
  },
};
