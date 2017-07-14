<template>
	<div class="admin-add">
        <div class="publish">
            <a class="publish-btn" @click="submitBlog()">发表博客</a>
            <div>
                <input type="text" v-model="title">
            </div>
        </div>
        <div class="markdownContainer">
            <div class="left">
                <textarea  placeholder="markdown..."  v-model="mdContent"></textarea>
            </div>
            <div class="right" v-html="mdHtml">
            </div> 
        </div>
		
	</div>
</template>
<script>
	import marked  from 'marked'
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
        computed:{
            mdHtml(){
                return marked(this.mdContent,{sanitize:true})||'预览...';
            }
        },
        methods:{
            ...mapActions(['addBlog']),
            submitBlog(){
                this.addBlog({
                    title:this.title,
                    content:this.mdContent
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
        .publish{
            height:60px;
            .publish-btn{
                background:#7EC0EE;
                height:30px;
                padding:15px 15px;
                color:#fff;
                border-radius:5px;
                cursor:pointer;
                &:hover{
                    background:#337ab7;
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