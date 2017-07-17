<template>
	<div class="header">
		<div class="logo">Dandan's Blog</div>
		<div class="login">
			<router-link to="login">Sign in</router-link>
			or
			<a href="">Sign out</a>
		</div>
	</div>
</template>
<script></script>
<style lang="less" scoped>
	.header{
		height:60px;
		border-bottom:solid 2px #fafafa;
		display: flex;
    	align-items: center;
    	position:relative;
		.logo{
			font-size:24px;
			font-family:Georgia, serif;
			color:#000000;
			font-style: italic;
			width:200px;
			margin-left:20px;
		}
		.login{
			position:absolute;
			right:20px;
			color:#333;
			font-size:14px;
			a{
				color:#337ab7;
				text-decoration:none;
				&hover{
					text-decoration:underline;
				}
			}
		}
	}
</style>