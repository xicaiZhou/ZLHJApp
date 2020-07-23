import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

import exhibitionList from '@/views/carInfo/exhibitionList.vue'

// 主界面
import main from '@/views/Home/main.vue'
// 录单材料菜单
import menu from '@/views/Menu/menu.vue'
// 车辆信息
import carInfo from '@/views/carInfo/carInfo.vue'
// 车型选择界面
import carModels from '@/views/carInfo/carModels.vue'
// 车辆品牌
import carModelList from '@/views/carInfo/carModelList'
// 车系列表
import carsList from '@/views/carInfo/carsList'
// 综合查询
import search from '@/views/Search/search.vue'
// 个人中心
import mine from '@/views/Mine/mine.vue'
// 设置
import setup from '@/views/Mine/setup'
// 修改密码获取手机验证码
import getphonecode from '@/views/Mine/getphonecode'
// 修改密码
import setnewpassword from '@/views/Mine/setnewpassword'


// 融资业务信息
import business from '@/views/BusinessInfo/businessInfo'

// 个人信息
import userInfo from '@/views/UserInfo/userInfo'
// 对私人员详情信息
import userInfoDetail from '@/views/UserInfo/userInfoDetail'
// 对公人员详情
import maleBrandInfoDetail from '@/views/UserInfo/maleBrandInfoDetail'

// 选择产品
import selectProduct from '@/views/Product/selectProduct'
// 产品列表
import productList from '@/views/Product/productList'
// 还款计划表-试算
import reimbursementPlan from '@/views/Product/reimbursementPlan'

// 文件上传
import uploadFile from '@/views/UploadFile/uploadFile'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path:'/menu',
      name:'menu',
      component:menu,
      meta:{
        keepAlive:false,
        title: '材料'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta:{
        keepAlive:false,
        title: '查询'
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine,
      meta:{
        keepAlive:false,
        title: '我的'
      }
    },
    {
      path: '/setup',
      name: 'setup',
      component: setup,
      meta:{
        keepAlive:false,
        title: '设置'
      }
    },
    {
      path: '/getphonecode',
      name: 'getphonecode',
      component: getphonecode,
      meta:{
        keepAlive:false,
        title: '安全验证'
      }
    },
    {
      path: '/setnewpassword',
      name: 'setnewpassword',
      component: setnewpassword,
      meta:{
        keepAlive:false,
        title: '修改密码'
      }
    },
    {
      path: '/',
      name: 'main',
      component: main,
      meta:{
        keepAlive:false,
        title: '首页'
      }
    },
    {
      path:'/carInfo',
      name:'carInfo',
      component:carInfo,
      meta:{
        keepAlive:true,
        title: '车辆信息'
      }
    },
    {
      path:'/exhibitionList',
      name:'exhibitionList',
      component:exhibitionList,
      meta:{
        keepAlive:false,
        title: '经销商列表'
      }
    },
    {
      path:'/carModels',
      name:'carModels',
      component:carModels,
      meta:{
        keepAlive:true,
        title: '车辆品牌'
      }
    },
    {
      path:'/carModelList',
      name:'carModelList',
      component:carModelList,
      meta:{
        keepAlive:false,
        title: '车辆品牌列表'
      }
    },
    {
      path:'/carsList',
      name:'carsList',
      component:carsList,
      meta:{
        keepAlive:false,
        title: '车系列表'
      }
    },
    {
      path:'/business',
      name:'business',
      component:business,
      meta:{
        keepAlive:false,
        title: '融资业务信息'
      }
    },
    {
      path:'/userInfo',
      name:'userInfo',
      component:userInfo,
      meta:{
        keepAlive:false,
        title: '个人信息'
      }
    },
    {
      path:'/userInfoDetail',
      name:'userInfoDetail',
      component:userInfoDetail,
      meta:{
        keepAlive:false,
        title: '个人详细信息'
      }
    },
    {
      path:'/maleBrandInfoDetail',
      name:'maleBrandInfoDetail',
      component:maleBrandInfoDetail,
      meta:{
        keepAlive:false,
        title: '个人详细信息'
      }
    },
    {
      path:'/selectProduct',
      name:'selectProduct',
      component:selectProduct,
      meta:{
        keepAlive:true,
        title: '选择产品'
      }
    },
    {
      path:'/reimbursementPlan',
      name:'reimbursementPlan',
      component:reimbursementPlan,
      meta:{
        keepAlive:false,
        title: '还款计划表-试算'
      }
    },
    {
      path:'/productList',
      name:'productList',
      component:productList,
      meta:{
        keepAlive:false,
        title: '产品列表'
      }
    },
    {
      path:'/uploadFile',
      name:'uploadFile',
      component:uploadFile,
      meta:{
        keepAlive:false,
        title: '文件上传'
      }
    },

  ]
})
