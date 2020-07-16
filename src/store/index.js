import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        token:'',
        loanId:'',
        loanNumber:'20200707153020238',
        // loanNumber:'20200703105318095',
        userInfo:{},
        carModel:{},
        cars:{},
        exhibition:{},
        carInfo:{},
        address:{
            province_list:[],
            city_list:[],
            county_list:[]
        },
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