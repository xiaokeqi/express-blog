import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './App.vue'
import routes from './route/routes.js'
import store from './store/index.js'

const router = new VueRouter({
	routes
})

new Vue({
	router,
	store,
	render:(h) => h(App)
}).$mount('#app')

