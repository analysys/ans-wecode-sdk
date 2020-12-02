import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../components/index.vue'
import Next from '../components/next.vue'

Vue.use(VueRouter);

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * @param  {string}   name     the filename (basename) of the view to load.
 */
function view(name) {
  name = !name.startsWith('/') ? '/' + name : name;
  return function(resolve) {
    require(['@/views' + name], resolve);
  };
}

const routes = [
  {
    path: '/',
    component: Index
},
{
    path: '/next',
    component: Next
}
];

const router = new VueRouter({
  // 不要用history模式，有兼容性问题
  mode: 'hash',
  // base: Cfg.BaseUrl,
  routes
});

// router.beforeEach(async (to, from, next) => {
//   // 全局路由钩子
// });

export default router;
