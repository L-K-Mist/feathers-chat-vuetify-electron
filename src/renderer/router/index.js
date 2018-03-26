import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'welcome-view',
      component: require('@/components/WelcomeView').default
    },
    {
      path: '/inspire',
      name: 'inspire',
      component: require('@/components/InspireView').default
    },
    {
      path: '/controller',
      name: 'controller',
      component: require('@/components/dashboard').default
    },
    {
      path: '/authentication',
      name: 'AppAuthentication',
      component: require('@/components/AppAuthentication').default
    },
    {
      path: '/graphs',
      name: 'Graphs',
      component: require('@/components/Graphs').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})