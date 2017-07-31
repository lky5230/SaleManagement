import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: function(resolve){
        require(["@/components/goods"], resolve);
      }
    },{
      path: '/judge',
      component: function(resolve){
        require(["@/components/judge"], resolve);
      }
    }
  ]
})
