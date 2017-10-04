import Vue from 'vue'
import Router from 'vue-router'
import Renderer from '@/components/Renderer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Renderer',
      component: Renderer
    }
  ]
})
