import Vue from 'vue';
import Router from 'vue-router';
import World from 'components/World';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'World',
      component: World
    }
  ]
})
