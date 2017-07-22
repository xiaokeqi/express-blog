<template>
	<div class="container">
		<headers></headers>
		<div class="content">
			<router-view></router-view>
		</div>
		
	</div>
</template>
<script>
	import Headers from './components/Header.vue'
	export default {
		data(){
			return {
				title:''
			};
		},
		components:{
			Headers
		}
	}
</script>
<style lang="less">
	*{
		padding:0;
		margin:0;
	}
	.content{
		font-size:12px;
		font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;
		color:#333;
	}
	p{
		line-height:27px;
		font-size:16px;
		a{
			color:#337ab7;
			text-decoration:none;
			&hover{
				text-decoration:underline;
			}
		}
	}
	.blog-content-index{
		img{
			border: solid 1px #ccc;
			max-height: 300px;
			max-width: 500px;
			margin: 10px 20px;
			border-radius:4px;
		}
		p{
			line-height: 24px;
		    font-size: 14px;
		    margin: 10px 0px;
		}
		h1,h2,h3,h4,h5,h6{
			margin:10px 0px;
		}
		pre{
			border-left: 3px solid #337ab7;
			padding-left: 11px;
			background: #F0F8FF;
		}
	}
</style>