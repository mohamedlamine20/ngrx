import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '../auth/state/auth.selector';
import { exhaustMap, map, tap } from 'rxjs';
import { AppState } from '../store/app.state';
export const authGuard: CanActivateFn = (route, state) => {
      let isAuthenticate ;
      inject(Store<AppState>).select(isAuthenticated).subscribe(
       {
        next:(res)=>isAuthenticate=res
       }
      )
      if(!isAuthenticate){
       return inject(Router).createUrlTree(['auth']);
      }
      
  return true;
};
