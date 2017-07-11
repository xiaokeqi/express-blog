import App from '../App.vue'
import Index from '../views/user/Index.vue'
import Blog from '../views/user/Blog.vue'

import AdminIndex from '../views/admin/Index.vue'
import Add from '../views/admin/Add.vue'

export default [
 	{ 
 		path: '/',
      	component: Index	
    },
	{
	    path: '/user',
	    component: Index,
	    children: [{
	        path: 'blog',
	        component: Blog
	    }]
	},
	{
	    path: '/admin',
	    component: AdminIndex,
	    children: [{
	        path: 'add',
	        component: Add
	    }]
	}
]
