import apiUrl from "./apiConfig";
import Config from "../Config";
import $axios from './axios'

let apiUser = {
  login(userid, pwd) {
    let params = new URLSearchParams();
    params.append('userid', userid);
    params.append('pwd', pwd);
    params.append('mappid', Config.appId);
    return $axios.post(apiUrl.url_login, params);
  },
  /**
   * 忘记密码
   *
   * @param mappid 小程序id
   * @param mobile 手机号码
   * @param pwd    密码
   * @param yzm    验证码
   * @return
   * @throws Exception
   */
  forgetPwd(username, pwd, yzm) {
    let params = new URLSearchParams();
    params.append('mobile', username);
    params.append('pwd', pwd);
    params.append('yzm', yzm);
    params.append('mappid', Config.appId);
    return $axios.post(apiUrl.url_forgetPwd, params);
  },
  sendVerifyCode(mobile) {
    let params = new URLSearchParams();
    params.append('mobile', mobile);
    return $axios.post(apiUrl.url_sendVerifyCode, params);
  },
};
export default apiUser
