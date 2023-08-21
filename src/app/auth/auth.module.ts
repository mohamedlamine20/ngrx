import { NgModule } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms"; ;
import { EffectsModule } from "@ngrx/effects";
import { AuthEffect } from "./state/auth.effect";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
    {
      path:'',children:[
        {
            path:'',redirectTo:'login',pathMatch:'full'
        },
        {
            path:'login',component:LoginComponent
        },
        {
          path:'signup',component:SignupComponent
        }
      ]
    },
  ];

@NgModule({
    imports:[CommonModule,RouterModule.forChild(routes),ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffect])],
  declarations: [
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule{

}