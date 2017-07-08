<template>
	<div class="blog-container">
		<div class="blog-header">
			<h1>整合 task/test （任务/测试）运行器</h1>
		</div>
		<div class="blog-content" v-html="blogContent">
			
		</div>
	</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
	export default{
		computed:{
			...mapState({
				blogContent:state => state.user.blogContent
			})
		},
		methods:{
			...mapActions([
				'getBlogContent'
			])
		},
		created(){
			this.getBlogContent();
		}
	}
</script>

<style lang="less" scoped>
	.blog-container{
		margin-top:30px;
		.blog-header{
			margin:0px 10px 30px 0px;
		}
		.blog-content{
			
		}
	}
</style>