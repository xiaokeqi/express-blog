<template>
	<div class="blog-login-container">
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
						this.$router.push({ path: '/admin/list'})
					}
				});
			}
		}
	}
</script>
<style lang="less" scoped>
	.blog-login{
		padding-top: 100px;
	    border-radius: 4px;
	    width: 400px;
	    height: 261px;
	    margin: auto;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    margin-left: -200px;
	    margin-top: -200px;
	    box-shadow: 0px 0px 7px 0px #337ab7;
		div{
			width:250px;
			margin:0 auto;
			margin-top:12px;
			text-align:center;
			input{
				width:208px;
				height:30px;
			}
			a{
				padding: 9px;
			    display: inline-block;
			    border: solid 1px #337ab7;
			    background: #337ab7;
			    width: 50px;
			    border-radius: 5px;
			    color: #fff;
			    cursor: pointer;
			}
		}
	}
</style>