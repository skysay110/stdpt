/*
 * @Author: liwenlong
 * @Date: 2017-12-13 13:26:02
 * @Last Modified by: liwenlong
 * @Last Modified time: 2018-06-06 18:32:30
 * @放置我们的状态变更函数的驱使函数
 */
import * as types from './mutation-types'

export const actions = {
  commit_title({commit}, current) {
    commit(types.TITLE, current)
  },
  commit_tab_index({commit}, current) {
    commit(types.TAB_INDEX, current)
  },
  commit_show_nav_back({commit}, current) {
    commit(types.SHOW_BACK, current)
  },
  commit_userInfo({commit}, current) {
    commit(types.USER_INFO, current)
  }
};
