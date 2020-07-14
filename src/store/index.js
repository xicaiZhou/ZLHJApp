import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ3ZWIiLCJpc3MiOiJzcHJpbmctYm9vdC1wbHVzIiwiZXhwIjoxNTk0NzI3MjAwLCJpYXQiOjE1OTQ2OTEyMDAsImp0aSI6ImVhZjVhMmQyNTdhZTRlYjI4OGVkYmIxMWI3OTVkNzIyIiwidXNlcm5hbWUiOiJhZG1pbiJ9._MniKISbytlXmRC9Nw3776AuxPzaeu7wAKsaeq6TDmk',
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