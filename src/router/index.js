import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import pdf from '@/views/manual/pdf'
import manualList from '@/views/manual/manualList'
import search from '@/views/Search/search'
import network from '@/views/networkDemo/network'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: pdf
    },
    {
      path:'/manualList',
      name:'manualList',
      component:manualList
    },
    {
      path:'/search',
      name:'search',
      component:search
    },
    {
      path:'/network',
      name:'network',
      component:network
    }
  ]
})
