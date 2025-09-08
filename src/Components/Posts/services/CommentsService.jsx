import { jpAxios } from "../../../JpAxios"

export const getCommentsService = (postId)=>{
     return jpAxios.get(`/comments?postId=${postId}`)
}
