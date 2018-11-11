import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Generator from './components/Generator.vue'
import EndpointList from './components/EndpointList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/generator',
      name: 'generator',
      component: Generator
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/endpoints',
      name: 'endpoint',
      component: EndpointList
    }
  ]
})
