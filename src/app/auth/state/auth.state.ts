import { User } from "src/app/models/user.mode";

export interface AuthState{
 user :User|null
}

export const initialState : AuthState =     {user:null};