`为什么不直接使用正常a标签写法做链接跳转呢？当点击正常的a链接时，就会感觉到页面跳转时的页面刷新重载的感觉，因为这个a标签并没有被vue-router所监听到事件的触发，所以就会发生正常的页面跳转，所以页面就会重载。那是传统的网页上才会发生的事。使用了vue-router组件所提供的router-link后，页面内的a标签就会被vue所监听，以便在用户点击链接的时候阻止浏览器的默认跳转行为，而转为无刷新加载的方式。当然这只作用于自己的站点内。`

mongoimport -d dumall -c goods --file 

mongod --dbpath d:\MongoDB\data --logpath d:\MongoDB\log\mongo.log --journal

// 注册全局
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
 
//单独的组件里面使用
import infiniteScroll from 'vue-infinite-scroll'
new Vue({
  directives: {infiniteScroll}
})