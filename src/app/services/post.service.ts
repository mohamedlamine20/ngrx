import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`https://vue-completecourse.firebaseio.com/posts.json`)
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          let i =1;
          for (let key in data) {            
            posts.push({ ...data[key],id:i});
            i++;
          }
          return posts;
        })
      );
  }

  addPost(post:Post):Observable<Post>{
    return this.http.post<Post>(`https://vue-completecourse.firebaseio.com/posts.json`,post);
  }
}
