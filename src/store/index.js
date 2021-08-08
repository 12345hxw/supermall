import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//1.安装
Vue.use(Vuex)

//2.创建store
const state ={
  cartList:[]
}
const store =new Vuex.Store({
  state,
  mutations,
    //mutations唯一的目的就是state中的状态
    //mutations中的每一个放一个方法尽可能完成的事件比较单一一点
  
  actions,
  getters
})

//3.挂载到实例上
export default store


