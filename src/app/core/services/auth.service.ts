import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { HttpService, Response } from '@app/core/services/http.service';
import { UtilityService } from '@app/core/services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate, Resolve<any> {

  private adminRoutes = ["/paymentapproval", "/withdraw-approval", "/withdrawmethods", "/plans", "/pending", "/direct-referrals/table-view", "/comission-setting"];
  private userRoutes = ["/dashboard", "/company", "/direct-referrals/table-view", "/withdraw", "/profile"];

  private loginUser;

  constructor(
    private http: HttpService,
    private utility: UtilityService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    const authorizationToken = this.utility.getCookie('authToken');
    if (!authorizationToken) {
      this.router.navigate(['/login']);
      return false;
    }
    return new Promise((resolve, reject) => {
      this.http.get('user/me').then((result: Response) => {
        let user = result.body.data;
        this.loginUser = user;
        if (user.userType == 'admin') {
          let result = this.adminRoutes.includes(state.url);
          if (result) {
            return resolve(true);
          }
          this.router.navigate(['/paymentapproval']);
          return resolve(false);
        } else {
          if (user.isProfileComplete && user.isMobileVerified) {
            if (user.accountStatus == 'notset') {
              if (state.url == '/payment/manual') {
                return resolve(true);
              }
              this.router.navigate(['/payment/manual']);
              return resolve(false);
            } else if (user.accountStatus == 'pending' || user.accountStatus == 'rejected' || user.accountStatus == 'locked') {
              if (state.url.includes('/account-status/')) {
                return resolve(true);
              }
              this.router.navigate(['/account-status/' + user.accountStatus]);
              return resolve(false);
            } else {
              let result = this.userRoutes.includes(state.url);
              if (result) {
                return resolve(true);
              }
              this.router.navigate(['/dashboard']);
              return resolve(false);
            }
          }
          else if (user.isProfileComplete) {
            if (!user.isMobileVerified) {
              if (state.url == '/phone-verification') {
                return resolve(true);
              } else {
                this.router.navigate(['/phone-verification']);
                return resolve(false);
              }
            }
          } else {
            if (state.url == '/compelete-profile') {
              return resolve(true);
            } else {
              this.router.navigate(['/compelete-profile']);
              return resolve(false);
            }
          }
        }
      }).catch((error: Response) => {
        this.router.navigate(['/login']);
        resolve(false);
      })
    })
  }
  resolve() {
    return this.loginUser;
  }
}
