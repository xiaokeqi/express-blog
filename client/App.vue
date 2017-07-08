<template>
	<div class="container">
		<headers></headers>
		<left-nav></left-nav>
		<div class="content">
			<router-view></router-view>
		</div>
		
	</div>
</template>
<script>
	import Headers from './components/Header.vue'
	import LeftNav from './components/LeftNav.vue'
	export default {
		components:{
			LeftNav,
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
		margin-left:220px;
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
</style>