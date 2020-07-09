import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ3ZWIiLCJpc3MiOiJzcHJpbmctYm9vdC1wbHVzIiwiZXhwIjoxNTk0MzAzNjcwLCJpYXQiOjE1OTQyNjc2NzAsImp0aSI6IjRmMWIzN2RkZmQwYzQ0ZDk5NjUwY2YwYzA1NmQ1NmU0IiwidXNlcm5hbWUiOiJhZG1pbiJ9.V8gB6WqOlkY411GPae_ZNC2GjWJKWsA87Efl_4szaYg',
        loanId:'',
        loanNumber:'20200707153020238',
        // loanNumber:'20200703105318095',
        userInfo:{},
        carModel:{},
        cars:{},
        exhibition:{},
        carInfo:{},
        address:{},
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