<template>
	<div class="blog-left">
		<ul>
			<li v-for="blog in blogNameList">{{blog.name}}</li>
		</ul>
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
			...mapActions([
				'getBlogNameList'
				])
		},
		created(){
			this.getBlogNameList({dan:'pangzi'});
		},
		mounted(){
		}
	}
</script>

<style lang="less" scoped>
	.blog-left{
		width:200px;
		position:absolute;
		top:60px;
		bottom:0;
		left:0;
		right:0;
		background:#fafafa;
		ul{
			padding:10px 10px 10px 20px;
			list-style:none;
			li{
				border-bottom: dashed 1px #ccc;
			    height: 31px;
			    font-size: 12px;
			    line-height: 42px;
			}
		}
	}
</style>