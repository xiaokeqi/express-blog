import { getRequest, postRequest } from './request.js'

export default {
    state: {
        blogNameList: {},
        blogContent: ''
    },
    mutations: {
        setBlogNameList(state, blogNameList) {
            state.blogNameList = blogNameList;
        },
        setBlogContent(state, blogContent) {
            state.blogContent = blogContent;
        }
    },
    actions: {
        getBlogNameList({ commit, state }, params) {
            let url = '/user/getBlog';
            return getRequest(url, params).then((data) => {
                commit('setBlogNameList', data.data);
                return data;
            })
        },
        getBlogContent({ commit, state }, params) {
            let url = '/user/getContent';
            return getRequest(url, params).then((data) => {
                commit('setBlogContent', data.data);
                return data;
            })
        },
        addBlog({ commit, state }, params) {
            let url = 'user/addBlog';
            return postRequest(url, params);
        },
        delBlogContent({ commit, state}, params){
            let url = 'user/delBlog';
            return postRequest(url, params);
        },
        editBlogContent({commit, state}, params){
            let url = 'user/editBlog';
            return postRequest(url, params);
        },
        login({commit, state}, params){
            let url = 'user/login';
            return postRequest(url, params);
        }
    }
}
