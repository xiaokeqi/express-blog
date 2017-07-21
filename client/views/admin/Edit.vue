<template>
	<div class="admin-edit">
        <div class="publish-title">
            标题:<input type="text" disabled="disabled" v-model="blogContent.title">*
            <div class="publish">
                <a class="publish-btn" @click="submitBlog()">编辑博客</a>
            </div>
        </div>
        
        <div class="markdownContainer">
            <div class="left">
                <textarea  placeholder="markdown..."  v-model="blogContent.content"></textarea>
            </div>
            <div class="right" v-html="mdHtml">
            </div> 
        </div>
        <upload></upload>
	</div>
</template>
<script>
	import marked  from 'marked'
    import {mapActions, mapState} from 'vuex'
    import upload from '../../components/Upload.vue';
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
                blogContentEdit:{},
                mdHtml:''
			};
		},
        computed:{
            ...mapState({
				blogContent(state){
					this.blogContentEdit = state.user.blogContent;
					if(state.user.blogContent){
						this.mdHtml = marked(state.user.blogContent.content);
					}
					return state.user.blogContent;
				}
			})
        },
        components:{
            upload
        },
        methods:{
            ...mapActions(['editBlogContent','getBlogContent']),
            submitBlog(){
                if(!this.blogContent.title){
                    alert('请填写标题！');
                    return;
                }
                if(!this.blogContent.content){
                    alert('请填写内容！');
                    return;
                }
                this.editBlogContent({
                    title:this.blogContent.title,
                    content:this.blogContent.content
                }).then((res) => {
                    this.$router.push({ path: '/admin/list' })
                })
            }
        },
        created(){
        	this.getBlogContent({title:this.$route.query.title});
        }
	}
</script>
<style lang="less" scoped>
	.admin-edit{
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