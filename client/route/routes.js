import App from '../App.vue'
import Index from '../views/user/Index.vue'
import Blog from '../views/user/Blog.vue'

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
	}
]
