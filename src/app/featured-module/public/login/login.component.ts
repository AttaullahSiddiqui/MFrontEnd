import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService, UtilityService } from '@app/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  resetForm: FormGroup;
  isFormSubmit: boolean = false;
  isFormSubmit2: boolean = false;
  isRequestPending: boolean = false;
  isRequestPending2: boolean = false;
  serverMsg = "";
  currentModalId: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private util: UtilityService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
    // this.authService.authState.subscribe((user: SocialUser) => {
    //   if (user && user.id) {
    //     //this.socialAuth(user)
    //   }
    // });
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
      if (result.user.userType == 'admin') {
        url = "/paymentapproval";
      } else {
        let accountStatus = result.user.accountStatus;
        if (!result.user.isProfileComplete) {
          url = '/compelete-profile';
        } else if (!result.user.isMobileVerified) {
          url = '/phone-verification';
        } else if (accountStatus == 'notset') {
          url = '/payment/manual';
        } else if (accountStatus == 'pending' || accountStatus == 'rejected' || accountStatus == 'locked') {
          url = '/account-status/' + accountStatus;
        }
      }
      this.router.navigate([url])
    }).catch((err: Response) => {
      this.isRequestPending = false;
      this.serverMsg = err['error'].message;
    })
  }
  sendResetLink(valid, value) {
    this.isFormSubmit2 = true;
    if (!valid || this.isRequestPending2) {
      return;
    }
    this.isRequestPending2 = true;
    this.http.post('user/forget', value).then(success => {
      this.isRequestPending2 = false;
      this.closePopup('inviteModal')
      this.toastr.success('Reset password link sent to your Email', 'Success');
    }).catch((err: Response) => {
      this.isRequestPending2 = false;
      this.toastr.error(err['error'].message, 'Error');
    })
  }

  signInWithFB(): void {
    //this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signInWithGoogle(): void {
    //this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  socialAuth(data) {
    this.http.post('user/socail-login', data).then(success => {
      let result = success.body.data;
      this.util.setCookie('authToken', result.accessToken, { expireDays: 30 });
      let url = "/dashboard";
      let accountStatus = result.user.accountStatus;
      if (!result.user.isProfileComplete) {
        url = '/compelete-profile';
      } else if (!result.user.isMobileVerified) {
        url = '/phone-verification';
      } else if (accountStatus == 'notset') {
        url = '/payment/manual';
      } else if (accountStatus == 'pending' || accountStatus == 'rejected' || accountStatus == 'locked') {
        url = '/account-status/' + accountStatus;
      }
      this.router.navigate([url])
    }).catch((err: Response) => {
      this.isRequestPending = false;
      alert(err['error'].message);
    })
  }
  openPopup(modalId) {
    let id = '#' + modalId;
    this.currentModalId = modalId;
    $(id).modal({ show: true, backdrop: 'static', keyboard: false });
  }
  closePopup(modalId) {
    let id = '#' + modalId;
    $(id).modal('hide');
  }
}
