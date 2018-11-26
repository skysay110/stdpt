/*
 * @Author: liwenlong
 * @Date: 2017-12-13 13:25:10
 * @Last Modified by: liwenlong
 * @Last Modified time: 2018-06-06 18:29:03
 * @introduction: 组装模块并导出 store 的地方
 */

import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
