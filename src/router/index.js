import Vue from 'vue'
import Router from 'vue-router'

import Record from '../pages/Record.vue'
import Stastic from '../pages/Stastic.vue'
import Tag from '../pages/Tag.vue'
import Edit from '../pages/Edit.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/record',
    name: 'Record',
    component: Record
  }, {
    path: '/stastic',
    name: 'Stastic',
    component: Stastic
  }, {
    path: '/tag',
    name: 'Tag',
    component: Tag
  }, {
    path: '/',
    redirect: '/record'
  },{
    path:'/edit',
    name:'Edit',
    component:Edit
  }]
})
