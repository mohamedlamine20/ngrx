import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post.model';
import { deletePost } from '../posts/state/post.action';

@Injectable({
  providedIn: 'root'
})
export class PostService {
   
  url:string='https://vue-completecourse.firebaseio.com/posts.json';
  localUrl ='http://localhost:32050/post';

  constructor(private http:HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.localUrl)
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {            
            posts.push({ ...data[key]});
          }
          return posts;
        })
      );
  }

  addPost(post:Post):Observable<Post>{
    return this.http.post<Post>(this.localUrl,post);
  }

  updatePost(post:Post){

    const postData = {[post.id?post.id:'']:{title:post.title,description:post.description}}
    return this.http.put(this.localUrl,postData);
  }

  deletePost(id:string){

    return this.http.delete(`${this.localUrl}/${id}`);

  }
}
