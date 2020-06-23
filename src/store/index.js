import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userId:''
    },
    mutations:{
        updateParam(state,param){
            state.userId = param['userId']
        }
    },
    getters:{

    },
    actions:{

    }
})
export default store