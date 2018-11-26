import apiUrl from "./apiConfig";
import Config from "../Config";
import $axios from './axios'

let apiCp = {
  getCpListAll(params) {
    return $axios.post(apiUrl.url_getCpListAll, params);
  },
  getCpById(id) {
    let params = new URLSearchParams();
    params.append('mappid', Config.appId);
    params.append('id', id);
    return $axios.post(apiUrl.url_getCpById, params);
  },
};
export default apiCp;
