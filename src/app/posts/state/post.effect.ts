import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "src/app/services/post.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPost, loadPostSuccess, updatePost, updatePostSuccess } from "./post.action";
import { map, mergeMap, of, switchMap } from "rxjs";
import { updateChannelName } from "src/app/counter/state/counter.actions";


@Injectable()
export class PostEffects{
 
    constructor(private action$:Actions,private postService:PostService){
    }


    loadPosts$ = createEffect (()=>{
        return this.action$.pipe(
            ofType(loadPost),
            mergeMap((action)=>{
             return this.postService.getPosts().pipe(
               map(data=>{
                console.log(data);
                
               return loadPostSuccess({posts : data})
              })
             )
            })
        )
    }); 


    addPost$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(addPost),
            mergeMap((action)=>{
                return this.postService.addPost(action.post).pipe(
                   map((data)=>{
                    const post = {...action.post,id:data.name}
                    return addPostSuccess({post});
                   })
                )
            })
        )
    })

    updatePost$=  createEffect(()=>{
       return this.action$.pipe(
        ofType(updatePost),
        switchMap((action)=>{
          return this.postService.updatePost(action.post)
          .pipe(
            map((data)=>{
                return updatePostSuccess({post:action.post })
            })
          )

        })
       )
    })

    deletePost$=  createEffect(()=>{
        return this.action$.pipe(
         ofType(deletePost),
         switchMap((action)=>{
           return this.postService.deletePost(action.id)
           .pipe(
             map((data)=>{
                 return deletePostSuccess({id:action.id})
             })
           )
 
         })
        )
     })
 


}