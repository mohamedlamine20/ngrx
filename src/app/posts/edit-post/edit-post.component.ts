import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/post.selector';
import { Post } from 'src/app/models/post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updatePost } from '../state/post.action';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit{

  post !: Post;
  postForm!:FormGroup;
 constructor(private activeRoute:ActivatedRoute,private  store : Store<AppState>){

 }



 createForm(){
  this.postForm = new FormGroup({
    title: new FormControl(this.post.title,[
      Validators.required,
      Validators.minLength(6)
    ]),
    description : new FormControl(this.post.description,
      [
        Validators.required,
        Validators.minLength(10)
      ])
  })
}
  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(
      (params)=>{
       const id = params.get('id');   
       this.store.select(getPostById(id?id:''))
       .subscribe(
        (post)=>{         
          this.post= post?post:{title:'',description:''};
        }
       )
       this.createForm();
      }
    )
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

onSubmit(){

  const post ={
  id:this.post.id,
  title:this.postForm.get('title')?.value,
  description:this.postForm.get('description')?.value
 }

  this.store.dispatch(updatePost({post}));
  this.postForm.reset();
}

}
