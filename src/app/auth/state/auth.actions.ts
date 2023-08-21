import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.mode";

export const LOGIN_START = '[login page]login start';
export const LOGIN_SUCCESS = '[login page]login success';
export const LOGIN_FAILED = '[login page]login failed';

export const SIGNUP_START = '[login page]signup start'

export const SIGNUP_SUCCESS = '[login page]signup success'

export const AUTO_LOGIN_ACTION = '[login page]auto login'

export const LOGOUT_ACTION = '[login page]logout '

 


export const LoginStart = createAction(LOGIN_START, props<{ email: any, password: any }>());

export const LoginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User ,redirect :boolean}>());

export const LoginFailed = createAction(LOGIN_FAILED);

export const signupStart = createAction(SIGNUP_START, props<{ email: string, password: string }>());

export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{ user: User ,redirect:boolean}>());

export const autoLogin = createAction(AUTO_LOGIN_ACTION);

export const autoLogout = createAction(LOGOUT_ACTION);





