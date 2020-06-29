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
// 综合查询
import search from '@/views/Search/search.vue'
// 个人中心
import mine from '@/views/Mine/mine.vue'
// 车辆品牌
import carModelList from '@/views/carInfo/carModelList'
// 车系列表
import carsList from '@/views/carInfo/carsList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{
        keepAlive:false,
        title: '菜单'
      }
    },
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
      path: '/main',
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
    }
  ]
})
