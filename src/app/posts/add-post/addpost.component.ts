import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/post.action';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  postForm !: FormGroup;
  constructor(private store : Store<AppState>){

  }
  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null,[
        Validators.required,
        Validators.minLength(6)
      ]),
      description : new FormControl(null,
        [
          Validators.required,
          Validators.minLength(10)
        ])
    })
  }
 onAddPost(){
    if(!this.postForm.valid)
    return;

    const post:Post = {
      title: this.postForm.get('title')?.value,
      description:this.postForm.get('description')?.value
    }
    
    this.store.dispatch(addPost({post})); 
    this.postForm.reset();
    

 }

 showDescriptionError(){
  const descriptionForm = this.postForm.get('description');
  if(descriptionForm?.touched && !descriptionForm.valid ){
    if(descriptionForm.errors?.['required']){
      return 'Description is required'
    }
    if(descriptionForm.errors?.['minlength']){
      return 'Description should be minium 10 character'
    }
  }
  return ''
 }
}
