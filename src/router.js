import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import ReverseEngineeringForm from './components/ReverseEngineeringForm.vue'
import EntityModelsAndFilters from './components/EntityModelsAndFilters.vue'
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
      path: '/reverseengineeringform',
      name: 'reverseengineeringform',
      component: ReverseEngineeringForm
    },
    {
      path: '/entitymodelsandfilters',
      name: 'entityModelsAndFilters',
      component: EntityModelsAndFilters
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
