import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from '../state/post.selector';
import { deletePost, loadPost } from '../state/post.action';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {

    this.posts$ = this.store.select(getPosts);
    
    this.store.dispatch(loadPost());

  }

  delete(id:any){
  this.store.dispatch(deletePost({id}));
  }
}
