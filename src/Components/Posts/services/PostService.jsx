import { jpAxios } from "../../../JpAxios"
import { Success } from "../../../utils/AlertUtil"

export const getPostService = ()=>{
     return jpAxios.get('/posts')
}
export const getPostsPageService = (currentPage,limit)=>{
     return jpAxios.get(`todos?_page=${currentPage}&_limit=${limit}`)
}


export const setPostService = async (data)=>{
     const res = await jpAxios.post('/posts', data)
     if(res){
          console.log(res.data,'created')
          Success('اضافه کردن پست', 'پست با موفقیت اضافه شد')
     }

}
export const updatePostService = async (data, postId)=>{
     const res = await jpAxios.put(`/posts/${postId}`, data);
     if (res){
          Success('ویرایش پست', 'پست با موفقیت ویرایش شد')
          console.log(res,'updated')
     }
}

