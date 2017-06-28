import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './App.vue'

import routes from './route/routes.js'

const router = new VueRouter({
	routes
})

new Vue({
	router,
	el:'#app',
	render:(h) => h(App)
})

