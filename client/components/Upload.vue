<template>
	<div>
		<div class="js-h5upload blog-h5upload"></div>
		<div v-if="url" class="copy-url">
			<div>{{url}}</div>
			<div class="close">
				<a @click="close">关闭</a>
			</div>
		</div>
	</div>
	
</template>
<script>
	import $ from 'jquery';
	import h5upload from '../static/h5upload.js';
	export default {
		data(){
			return {
				url:''
			};
		},
		methods:{
			close(){
				this.url = '';
			}
		},
		mounted(){
			let self = this;
			h5upload.html5Upload({
				dom:$('.js-h5upload'),
        		paramname: 'image', //与后端约定的请求参数名称
        		url: '/user/upload', //图片上传路径,如http://upimg.baike.so.com/create/upload/
        		fileType: '*.jpg;*.png;*.jpeg;*.gif', //value:'*.jpg;*.png;*.jpeg;*.gif'支持文件类型，默认用‘;’号隔开
        		maxfilesize: '5MB', //上传文件大小，单位为MB，如5MB
        		maxfiles: 1,
        		formData:{},
        		multi: false,
        		uploadType: "BinaryString",
        		buttonText: '上传图片', //上传按钮文案，todo//html5 append
        		width: 100, //上传按钮宽度
        		height: 32, //上传按钮高度
        		buttonClass: 'label-style', //上传按钮样式
		        afterAll: function() {
		        },
		        onerror: function(file, errorCode, msg) {
		        	alert(msg);
		        },
		        beforeUpload: function() {
		        },
		        uploadStarted: function() {
		        },
		        uploadFinished: function(file, json, response) {
		        	var data = JSON.parse(json);
		        	if(data.errno == 0){
		        		self.url = data.data.url;
		        	}
		        	
		        },
		        progressUpdated: function() {
		        }
			})
		}
	}
</script>
<style lang="less" scoped>
	.blog-h5upload{
		label{
			display: inline-block;
		    cursor: pointer;
		    border: solid 1px #7EC0EE;
		    height: 100px;
		    position: fixed;
		    right: 0;
		    top: 50%;
		    border-radius: 100px;
		    width: 100px;
		    text-align: center;
		    line-height: 100px;
		    background: #7EC0EE;
		    color:#fff;
		}
	}
	.copy-url{
		width: 300px;
	    padding: 40px;
	    word-wrap: break-word;
	    border: 1px solid #ccc;
	    border-radius: 8px;
	    box-shadow: 0px 0px 7px 0px #ccc;
	    position: fixed;
	    left: 50%;
	    top: 50%;
	    margin-left: -150px;
	    opacity: 1;
	    background: #fff;
	    .close{
	    	text-align: right;
    		margin-top: 20px;
    		a{
    			color: #337ab7;
    			text-decoration: none;
    			cursor:pointer;
    		}
	    }
	}
</style>