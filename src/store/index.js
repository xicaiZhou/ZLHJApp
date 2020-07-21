import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        token:'',
        loanId:'',
        userInfo: {
            loginSysUserVo: {
              id: 0,
              username: "",
              nickname: "",
              gender: 0,
              state: 0,
              departmentId: 0,
              departmentName: "",
              roleId: 0,
              roleName: "",
              roleCode: ""
            },
            token: ""
          },
          loanNumber:'',
        // loanNumber:'20200707153020238',
        // loanNumber:'20200703105318095',
        // loanNumber:'20200715113656719',
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
            state.userInfo = param;
            state.token = param["token"];
        },
    },
    getters:{

    },
    actions:{

    }
})
export default store