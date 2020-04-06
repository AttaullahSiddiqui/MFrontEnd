import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService, Response } from '@app/core/services/http.service';
import { UtilityService } from '@app/core/services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    private http: HttpService,
    private utility: UtilityService,
    private route: Router
    ) { }

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean{
    const authorizationToken = this.utility.getCookie('authToken');
    if(!authorizationToken){
      this.route.navigate(['/signin']);
      return false;
    }
    return new Promise((resolve, reject) => {
      this.http.get('user/auth').then( (result: Response) => {
        resolve(true);
      }).catch( (error: Response) => {
        this.route.navigate(['/signin']);
        resolve(false);
      })
    })
  }
}
