
import {getRequest, postRequest} from './request.js'

export default {
  state: {
  	blogNameList:{},
    blogContent:''
  },
  mutations: {
  	setBlogNameList(state, blogNameList){
  		state.blogNameList = blogNameList;
  	},
    setBlogContent(state,blogContent){
      state.blogContent = blogContent;
    }
  },
  actions: {
  	getBlogNameList({commit,state},params){
  		let url = '/blog/getBlog';
  		getRequest(url,params).then((data) => {
  			commit('setBlogNameList',data);
  		})
  	},
    getBlogContent({commit,state},params){
      let url = '/blog/getContent';
      getRequest(url,params).then((data) => {
        commit('setBlogContent',data);
      })
    }
  }
}
