import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { authGuard } from "./services/auth.guard";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'counter', loadChildren: () => import('./counter/counter.module').then((m) => m.CounterModule) },
    { path: 'posts', loadChildren: () => import('./posts/posts.module').then((m) => m.PostModule) ,canActivate:[authGuard]},
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {path:"product",loadChildren:()=>import('./fake-store/fake-store.module').then((m) => m.FakeStoreModule)}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}