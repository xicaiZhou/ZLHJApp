import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ3ZWIiLCJpc3MiOiJzcHJpbmctYm9vdC1wbHVzIiwiZXhwIjoxNTk0NzY4NDQxLCJpYXQiOjE1OTQ3MzI0NDEsImp0aSI6IjY3NTM1ZjcwNmZiMzRhODliOTQwNzI3MWFkMzQxNzU5IiwidXNlcm5hbWUiOiJhZG1pbiJ9.wwFV4FTZ-a4SlU2sEtpBUPbE9hCWEUvNTZc2JJrejnA',
        loanId:'',
        // loanNumber:'20200707153020238',
        loanNumber:'20200703105318095',
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