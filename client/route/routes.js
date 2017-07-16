import App from '../App.vue'
import Index from '../views/user/Index.vue'
import Login from '../views/user/Login.vue'

import AdminIndex from '../views/admin/Index.vue'
import Add from '../views/admin/Add.vue'
import List from '../views/admin/List.vue'
import Edit from '../views/admin/Edit.vue'

export default [
 	{ 
 		path: '/',
      	component: Index,
      	redirect:'/user'	
    },
    { 
 		path: '/login',
      	component: Login	
    },
	{
	    path: '/user',
	    component: Index
	},
	{
	    path: '/admin',
	    component: AdminIndex,
	    children: [{
	        path: 'add',
	        component: Add
	    },
	    {
	        path: 'list',
	        component: List
	    },
	    {
	        path: 'edit',
	        component: Edit
	    }]
	}
]
