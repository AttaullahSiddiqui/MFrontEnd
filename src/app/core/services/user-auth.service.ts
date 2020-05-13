import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { HttpService, Response } from '@app/core/services/http.service';
import { UtilityService } from '@app/core/services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService implements CanActivate {

  constructor(
    private http: HttpService,
    private utility: UtilityService,
    private router: Router
    ) { }

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean{
    const authorizationToken = this.utility.getCookie('authToken');
    if(!authorizationToken){
      this.router.navigate(['/login']);
      return false;
    }
    return new Promise((resolve, reject) => {
      this.http.get('user/me').then( (result: Response) => {
        let user = result.body.data;
        if(user.userType == 'user'){
          return resolve(true);
        }
        this.router.navigate(['/login']);
        return resolve(false);
      }).catch( (error: Response) => {
        this.router.navigate(['/login']);
        resolve(false);
      })
    })
  };



}
