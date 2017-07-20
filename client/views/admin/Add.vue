<template>
	<div class="admin-add">
        <div class="publish-title">
            标题:<input type="text" v-model="title">*
            <div class="publish">
                <a class="publish-btn" @click="submitBlog()">发表博客</a>
            </div>
        </div>
        
        <div class="markdownContainer">
            <div class="left">
                <textarea  placeholder="markdown..."  v-model="mdContent"></textarea>
            </div>
            <div class="right" v-html="mdHtml">
            </div> 
        </div>
        <upload></upload>
	</div>
</template>
<script>
	import marked  from 'marked'
    import upload from '../../components/Upload.vue';
    import {mapActions, mapState} from 'vuex'
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
	export default {
		data(){
			return {
                mdContent:'',
                title:''
			};
		},
        components:{
            upload
        },
        computed:{
            mdHtml(){
                return marked(this.mdContent,{sanitize:true})||'预览...';
            }
        },
        methods:{
            ...mapActions(['addBlog','getBlogNameList']),
            submitBlog(){
                if(!this.title){
                    alert('请填写标题！');
                    return;
                }
                if(!this.mdContent){
                    alert('请填写内容！');
                    return;
                }
                this.addBlog({
                    title:this.title,
                    content:this.mdContent
                }).then((res) => {
                    this.getBlogNameList();
                    this.$router.push({ path: '/admin/list' })
                })
            }
        },
        created(){
        }
	}

</script>
<style scoped lang="less">
	.admin-add{
		margin:20px;
        
        .publish-title{
            margin-bottom:15px;
            input{
                height:30px;
                width:200px;
            }
            .publish{
                height:40px;
                width:100px;
                float:right;
                .publish-btn{
                    background:#7EC0EE;
                    padding:10px 15px;
                    color:#fff;
                    border-radius:5px;
                    cursor:pointer;
                    text-decoration:none;
                    &:hover{
                        background:#337ab7;
                    }
                }
            }
        }
        .markdownContainer{
            display:flex;
            minheight:640px;
            .left{
                width:48%;
                margin-right:20px;
                textarea{
                    height:640px;
                    width:100%;
                }
            }
            .right{
                width:48%;
                border:solid 1px rgba(0,0,0,0.4);
                overflow:auto;
            }
        }
	}
</style>