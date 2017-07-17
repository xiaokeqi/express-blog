<template>
	<div class="blog-login">
		<div>
			用户名<input type="text" v-model="username">
		</div>
		<div>
			密&nbsp;&nbsp;&nbsp;码 <input type="password" v-model="password">
		</div>
		<div>
			<a v-on:click="blogLogin">登陆</a>
		</div>
	</div>
</template>
<script>
    import {mapActions, mapState} from 'vuex'
	export default {
		data(){
			return {
				username:'',
				password:''
			};
		},
		methods:{
			...mapActions(['login']),
			blogLogin(){
				debugger
				if(!this.username){
					alert('请填写用户名');
					return;
				}
				if(!this.password){
					alert('请填写密码');
					return;
				}
				this.login({
					username:this.username,
					password:this.password
				}).then((data) => {
					if(data.status==0){
						this.$router.push({ path: '/user'})
					}
				});
			}
		}
	}
</script>
<style lang="less" scoped>
	
</style>