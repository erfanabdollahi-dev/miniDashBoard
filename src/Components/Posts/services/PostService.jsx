import { jpAxios } from "../../../JpAxios"

export const getPostService = ()=>{
     return jpAxios.get('/posts')
}
export const getPostsPageService = (currentPage,limit)=>{
     return jpAxios.get(`todos?_page=${currentPage}&_limit=${limit}`)
}
