<template>
	<div class="admin-list">
		<div class="publish">
            <router-link  to="add" class="publish-btn">新增博客</router-link>
            <router-link  :to="{path:'/user'}" class="publish-btn">查看博客</router-link>
        </div>
		<table class="gridtable">
			<tr>
				<th>标题</th>
				<th>发表时间</th>
				<th>修改时间</th>
				<th>操作</th>
			</tr>
			<tr v-for="blog in blogNameList">
				<td>{{blog.title}}</td>
				<td>{{blog.time}}</td>
				<td>{{blog.etime}}</td>
				<td>
					<a @click="delBlog(blog.title)">删除</a>
					<router-link :to="{path:'edit', query:{title:blog.title}}">编辑</router-link>
				</td>
			</tr>
		</table>
	</div>
</template>
<script>
	import {mapActions,mapState} from 'vuex'
	export default {
		computed:{
			...mapState({
				blogNameList: state => state.user.blogNameList
			})
		},
		methods:{
			...mapActions(['getBlogNameList', 'delBlogContent', 'editBlogContent']),
			delBlog(title){
				this.delBlogContent({title:title}).then((data) => {
					this.getBlogNameList();
				});
			},
			editBlog(title){
				this.editBlogContent({title:title});
			}
		},
		created(){
			this.getBlogNameList();
		}
	}
</script>
<style lang="less" scoped>
	.admin-list{
		margin:20px;
		table.gridtable {  
			width:100%;
		    font-family: verdana,arial,sans-serif;  
		    font-size:11px;  
		    color:#333333;  
		    border-width: 1px;  
		    border-color: #666666;  
		    border-collapse: collapse;  
		}  
		table.gridtable th {  
		    border-width: 1px;  
		    padding: 8px;  
		    border-style: solid;  
		    border-color: #666666;  
		    background-color: #dedede;  
		}  
		table.gridtable td {  
		    border-width: 1px;  
		    padding: 8px;  
		    border-style: solid;  
		    border-color: #666666;  
		    background-color: #ffffff;  
		}
		.publish{
            height:40px;
            .publish-btn{
                background:#7EC0EE;
                padding:10px 15px;
                color:#fff;
                border-radius:5px;
                cursor:pointer;
                text-decoration:none;
                margin-right:30px;
                &:hover{
                    background:#337ab7;
                }
            }
        } 
	}
</style>