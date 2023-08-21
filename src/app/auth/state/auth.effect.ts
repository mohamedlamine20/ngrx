import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginStart, LoginSuccess, autoLogin, autoLogout, signupStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, merge, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.actions";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffect {

    constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>
        , private router: Router) {
    }


    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LoginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.store.dispatch(setErrorMessage({ message: '' }))
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return LoginSuccess({ user ,redirect:true})
                    }),
                    catchError(error => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errorMessage = this.authService.getErrorMessage(error.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            }))
    });

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(...[LoginSuccess, signupSuccess]),
            tap((action) => {
                this.store.dispatch(setErrorMessage({ message: '' }))
                if(action.redirect)
                this.router.navigate(['/']);
            })
        )
    }, { dispatch: false })



    signup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
                return this.authService.signup(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.store.dispatch(setErrorMessage({ message: '' }))
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return signupSuccess({ user ,redirect:true})
                    }),
                    catchError(error => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errorMessage = this.authService.getErrorMessage(error.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            }))
    });

    autoLogin$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(autoLogin) ,
            mergeMap((action)=>{
                const  user = this.authService.getUserFromLocalStorage();
                  return of(LoginSuccess({user,redirect:false}))              
            })
        );
    });


    autoLogout$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(autoLogout) ,
            map((action)=>{
                this.authService.logout();
            })
        );
    },{dispatch:false});
}