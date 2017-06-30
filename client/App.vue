<template>
	<router-view></router-view>
</template>
<script>
	export default {
	}
</script>
<style lang="less">
	.test{
		background:#333;
		height:100px;
		width:100px;
		.testchild{
			height:200px;
			width:200px;
			background:red;
		}
	}
</style>