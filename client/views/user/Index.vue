<template>
	<div>
		<left-nav v-on:blogtitle="getTitle"></left-nav>
		<div class="container">
			<div class="blog-container">
				<div class="blog-header">
					<h1></h1>
				</div>
				<div class="blog-content" v-html="blogContent">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import marked  from 'marked'
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });
	import {mapState,mapActions} from 'vuex'
	import LeftNav from '../../components/LeftNav.vue'
	export default{
		components:{
			LeftNav
		},
		computed:{
			...mapState({
				blogContent:state => {
					if(state.user.blogContent){
						return marked(state.user.blogContent.content)
					}else{
						return '';
					}
				}
			})
		},
		methods:{
			...mapActions([
				'getBlogContent'
			]),
			getTitle(msg){
				this.title = msg;
				this.getBlogContent({title:this.title});
			}
		},
		created(){
		}
	}
</script>
<style lang="less" scoped>
	.container{
		margin-left:220px;
		.blog-container{
			margin-top:30px;
			.blog-header{
				margin:0px 10px 30px 0px;
			}
			.blog-content{
				
			}
		}
	}

</style>