import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService, UtilityService } from '@app/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  isFormSubmit: boolean = false;
  isRequestPending: boolean = false;
  serverMsg = "";

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private util: UtilityService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
    this.authService.authState.subscribe((user: SocialUser) => {
      if (user && user.id) {
        this.socialAuth(user)
      }
    });
  }

  signIn(valid, value) {
    this.isFormSubmit = true;
    if (!valid) {
      return;
    }
    this.isRequestPending = true;
    this.http.post('user/login', value).then(success => {
      this.isRequestPending = false;
      let result = success.body.data;
      this.util.setCookie('authToken', result.accessToken, { expireDays: 30 });
      let url = "/dashboard";
      if(result.user.userType == 'admin'){
        url = "/paymentapproval";
      }else{
        let accountStatus = result.user.accountStatus;
        if(!result.user.isProfileComplete){
          url = '/compelete-profile';
        }else if(!result.user.isMobileVerified){
          url = '/phone-verification';
        }else if(accountStatus == 'notset'){
          url = '/payment/manual';
        }else if(accountStatus == 'pending' || accountStatus == 'rejected' || accountStatus == 'locked'){
          url = '/account-status/'+accountStatus;
        }
      }
      this.router.navigate([url])
    }).catch((err: Response) => {
      this.isRequestPending = false;
      this.serverMsg = err['error'].message;
    })
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  socialAuth(data) {
    this.http.post('user/socail-login', data).then(success => {
      let result = success.body.data;
      this.util.setCookie('authToken', result.accessToken, { expireDays: 30 });
      let url = "/dashboard";
      let accountStatus = result.user.accountStatus;
      if(!result.user.isProfileComplete){
        url = '/compelete-profile';
      }else if(!result.user.isMobileVerified){
        url = '/phone-verification';
      }else if(accountStatus == 'notset'){
        url = '/payment/manual';
      }else if(accountStatus == 'pending' || accountStatus == 'rejected' || accountStatus == 'locked'){
        url = '/account-status/'+accountStatus;
      }
      this.router.navigate([url])
    }).catch((err: Response) => {
      this.isRequestPending = false;
      alert(err['error'].message);
    })
  }

}
