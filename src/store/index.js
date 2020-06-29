import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        token:'',
        userInfo:{},
        carModel:{},
        cars:{}
    },
    mutations:{
        updateParam(state,param){
            state.userInfo = param["userInfo"];
            state.token = param["token"];
        },
    },
    getters:{

    },
    actions:{

    }
})
export default store