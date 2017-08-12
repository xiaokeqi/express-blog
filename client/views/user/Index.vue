<template>
	<div>
		<left-nav v-on:blogtitle="getTitle"></left-nav>
		<div class="container">
			<div class="blog-container">
				<div class="blog-header">
					<h1>{{blogContent.title}}</h1>
					<span>发表时间：{{blogContent.time}}</span>

				</div>
				<div class="blog-content-index" v-html="blogContent.content">
					
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
					let content = state.user.blogContent;
					if(content){
						var date = new Date(state.user.blogContent.time);
						var time = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) ;
						content.time = time;
						content.content = marked(state.user.blogContent.content);
						return content
					}
					return content;
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
		margin-left:200px;
    	background: #fff;
    	min-height:800px;

		.blog-container{
			margin:30px;
			.blog-header{
				margin:0px 10px 30px 0px;
				span{
					float: right;
    				text-decoration: underline;
				}
			}
		}
	}

</style>