import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  //存放状态（共享属性）
    isCollapse:false,    //侧边栏收缩状态，true为收起来，false为打开
    test:666
  },
  mutations: {    //改变state状态值
    changeisCollapse(state){
      state.isCollapse=!state.isCollapse   //改变收缩状态
    }
  },
  actions: {   
    // changemenu(context){
    //   context.commit('changeisCollapse');   //用action来触发commit
    //   this.$store.dispatch('changemenu');   //这句是在需要使用的地方用来触发action的，里面的参数就是action名
    // }
        // test({commit,state}){           //也可以用这种方式commit，和直接获取state的值记得用{}包起来
        //   commit('changeisCollapse');
        //   console.log(state.isCollapse);
        // }
       
  },
  modules: {
  }
})
