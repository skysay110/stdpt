/*
 * @Author: liwenlong
 * @Date: 2017-12-13 13:25:53
 * @Last Modified by: liwenlong
 * @Last Modified time: 2018-06-06 18:32:51
 * @production：状态的获取函数
 */

// 获取到状态并做加工
export const getters = {
  get_title(state) {
    return state.title
  },
  get_tab_index(state) {
    return state.tab_index
  },
  get_isShowBack(state) {
    return state.showBack
  },
  get_userInfo(state) {
    return state.userInfo
  },
};
