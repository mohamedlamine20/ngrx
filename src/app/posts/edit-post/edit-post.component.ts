import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit{
 constructor(private activeRoute:ActivatedRoute,private  store : Store<AppState>){

 }

  ngOnInit(): void {
   console.log(
   this.activeRoute.snapshot.params['id']); 

  }


}
