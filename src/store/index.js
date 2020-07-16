import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ3ZWIiLCJpc3MiOiJzcHJpbmctYm9vdC1wbHVzIiwiZXhwIjoxNTk0OTAwNzczLCJpYXQiOjE1OTQ4NjQ3NzMsImp0aSI6ImI1Y2FiNWFlNDVkNTQ2YTM5ZGNjMjZlODlkMjRhYmJlIiwidXNlcm5hbWUiOiJhZG1pbiJ9.LThSgZfreU4nxzXqx91QlvML_eKwasNxlD38FVbl3W0',
        loanId:'',
        // loanNumber:'20200707153020238',
        // loanNumber:'20200703105318095',
        loanNumber:'20200715113656719',
        productItem:{}, // 只做为选择产品后使用，记得清空。
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