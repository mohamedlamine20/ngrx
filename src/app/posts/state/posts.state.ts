import { Post } from "src/app/models/post.model"

export interface PostsState {
    posts: Post[],
    loaded:boolean
}
export const initialState: PostsState = {
    posts: [],
    loaded:false
}