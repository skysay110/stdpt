import * as types from './mutation-types'

// 变化 创建一个对象存储一系列我们接下来要写的 mutation 函数
export const mutations = {
  [types.TITLE](state, current) {
    state.title = current
  },

  [types.TAB_INDEX](state, current) {
    state.tab_index = current
  },

  [types.SHOW_BACK](state,current){
    state.showBack = current
  },

  [types.USER_INFO](state,current){
    state.userInfo = current
  },
};
