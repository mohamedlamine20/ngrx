import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { AddpostComponent } from "./add-post/addpost.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { StoreModule } from "@ngrx/store";
import { postReducer } from "./state/post.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PostEffects } from "./state/post.effect";


const routes: Routes = [
    {

        path: '', component: PostsListComponent,
        children: [{
            path: 'add', component: AddpostComponent
        },
        {
            path: 'edit/:id', component: EditPostComponent

        }
        ]
    }
]

@NgModule({
    declarations: [AddpostComponent, PostsListComponent, EditPostComponent],
    imports: [CommonModule, ReactiveFormsModule, EffectsModule.forFeature([PostEffects]),RouterModule.forChild(routes), StoreModule.forFeature('posts', postReducer)]
})
export class PostModule {

}