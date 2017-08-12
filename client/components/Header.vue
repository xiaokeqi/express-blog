<template>
	<div class="header">
		<div class="logo">Dandan's Blog</div>
		<div class="login">
			<router-link :to="{path:'/login'}">后台入口</router-link>
		</div>
	</div>
</template>
<script>
	import {mapActions,mapState} from 'vuex'

	export default{

	}
</script>
<style lang="less" scoped>
	.header{
		height:60px;
		border-bottom:solid 2px #fafafa;
		display: flex;
    	align-items: center;
    	position:relative;
    	background:#337ab7;
		.logo{
			font-size:24px;
			font-family:Georgia, serif;
			color:#ffffff;
			font-style: italic;
			width:200px;
			margin-left:20px;
			margin-bottom:20px;
		}
		.login{
			position:absolute;
			right:12px;
			bottom:8px;
			color:#333;
			font-size:14px;
			a{
				color:#fff;
				text-decoration:none;
				&hover{
					text-decoration:underline;
				}
			}
		}
	}
</style>