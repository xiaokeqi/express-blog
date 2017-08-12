<template>
	<div class="blog-left">
		<ul>
			<li v-for="blog in blogNameList" :title="blog.title" v-on:click="getBlog(blog.title)">{{blog.title}}</li>
		</ul>
	</div>
</template>
<script>
	import {mapActions,mapState} from 'vuex'
	export default {
		data(){
			return {
				isBlogList:true
			};
		},
		computed:{
			...mapState({
				blogNameList: state => state.user.blogNameList
			})
		},
		methods:{
			...mapActions(['getBlogNameList']),
			getBlog(title){
				this.$emit('blogtitle',title)
			},
			displayBlogList(bool){
				console.log(bool);
				this.isBlogList = bool;
			}

		},
		created(){
			this.getBlogNameList().then((data) =>{
				if(data.data){
					this.$emit('blogtitle',data.data[0].title)
				}
				
			});
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
		ul{
			padding:10px 10px 10px 20px;
			list-style:none;
			li{
				border-bottom: dashed 1px #ccc;
			    height: 31px;
			    font-size: 12px;
			    line-height: 42px;
			    overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap;
				cursor:pointer;
			}
		}
	}
</style>