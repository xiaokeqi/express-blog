<template>
	<div class="container">
		<left-nav></left-nav>
		<router-view></router-view>
	</div>
</template>
<script>
	import LeftNav from './components/LeftNav.vue'
	export default {
		components:{
			LeftNav
		}
	}
</script>
<style lang="less">
	*{
		padding:0;
		margin:0;
	}
</style>