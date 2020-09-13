import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        // screenHeight:200,
        userInfo: {
            loginSysUserVo: {
              id: 0, //iOS传id
              Id:0,  //Android传Id
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
            token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ3ZWIiLCJpc3MiOiJzcHJpbmctYm9vdC1wbHVzIiwiZXhwIjoxNjAwMDM4ODk4LCJpYXQiOjE2MDAwMDI4OTgsImp0aSI6Ijc1MGQ4MzQ0NjAzOTQzNjc4NTk0MTJjMzJlYWEwNzJjIiwidXNlcm5hbWUiOiJERVYyIn0.6umkqYGbxm6qEKANt1n3a0_JVyBCsKYqiljhslAejo0',
            // token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ3ZWIiLCJpc3MiOiJzcHJpbmctYm9vdC1wbHVzIiwiZXhwIjoxNTk3MTk0NTcyLCJpYXQiOjE1OTcxNTg1NzIsImp0aSI6IjliYjlkOTlkODU1MjRmZWU4ZjYyYzA2YmUyNDIzYTMwIiwidXNlcm5hbWUiOiJkZXYzIn0.yCU5cMYcTWfRgwy7naMf-xUR5HVtBEO_nWxQb_XzpFs'
          },
          loanNumber: '',
          loanStatus: 0,
          isload:false,
          isloadCarModels:false,
          isloadProduct:false,
        // loanNumber:'20200707153020238',
        // loanNumber:'20200703105318095',
        // loanNumber:'20200715113656719',
        productItem:{}, // 只做为选择产品后使用，记得清空。
        carModel:{},
        cars:{},
        exhibition:{},
        carInfo:{},
        systemInfo:{
            password:'',
            cache:'',
            phoneIsTouchID:false,
            phoneIsGesture:false,
        },
        address:{
            province_list:[],
            city_list:[],
            county_list:[]
        },
    },
    mutations:{
        updateParam(state,param){
            state.userInfo = param;
        },
        updateSystemInfo(state,info){
            state.systemInfo = info;
        }
    },
    getters:{

    },
    actions:{

    }
})
export default store