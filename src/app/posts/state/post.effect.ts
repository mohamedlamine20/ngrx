import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "src/app/services/post.service";
import { addPost, addPostSuccess, loadPost, loadPostSuccess } from "./post.action";
import { map, mergeMap, of } from "rxjs";


@Injectable()
export class PostEffects{
 
    constructor(private action$:Actions,private postService:PostService){
    }


    loadPosts$ = createEffect (()=>{
        return this.action$.pipe(
            ofType(loadPost),
            mergeMap((action)=>{
             return this.postService.getPosts().pipe(
               map(data=>loadPostSuccess({posts : data}))
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
                    console.log(data);                    
                    return addPostSuccess({post:data});
                   })
                )
            })
        )
    })


}