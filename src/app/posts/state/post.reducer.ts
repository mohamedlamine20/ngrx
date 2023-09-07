import { createReducer, on } from "@ngrx/store";
import { initialState } from "./posts.state";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPostSuccess, updatePost, updatePostSuccess } from "./post.action";

const _postReducer = createReducer(initialState,
    on(addPostSuccess,
        (state, action) => {

            let post = { ...action.post };
            return {
                ...state,
                posts: [...state.posts, post]
            }

        }

    ),
    on(updatePostSuccess,
        (state, action) => {
            let posts = state.posts.map(post => post.id === action.post.id ? action.post : post)
            return {
                ...state,
                posts: posts
            }
        }),
    on(deletePostSuccess, (state, action) => {
        let posts = state.posts.filter(post => post.id !== action.id)
        return {
            ...state,
            posts: posts
        }
    })
    , on(loadPostSuccess,(state,action)=>{
        return{
            ...state,
            posts:action.posts
        }
    })
)

export function postReducer(state: any, action: any) {
    return _postReducer(state, action);
}