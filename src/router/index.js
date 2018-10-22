import Vue from 'vue'
import Router from 'vue-router'
import TodoMain from '@/components/ToDoMain.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoMain',
      component: TodoMain
    }
  ]
})
