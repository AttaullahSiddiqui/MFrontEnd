import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService, UtilityService } from '@app/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  referralId: string;
  planId: string;
  signupForm: FormGroup
  isFormSubmit: boolean = false;
  isRequestPending: boolean = false;
  serverMsg = "";

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private util: UtilityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.planId = paramMap.get('plan');
      this.referralId = paramMap.get('id');
      console.log("Id", paramMap.get('id'))
      console.log("Plan", paramMap.get('plan'))
    })
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  register(valid, value) {
    this.isFormSubmit = true;
    this.serverMsg = "";
    if (!valid) {
      return;
    }
    this.isRequestPending = true;
    let payload = {};
    Object.assign(payload, value);
    if (this.referralId) payload['referralId'] = this.referralId;
    payload['registrationType'] = 'self';
    payload['planId'] = this.planId;
    this.http.post('user/register', payload).then(success => {
      this.resetForm();
      this.isRequestPending = false;
      let result = success.body.data;
      this.util.setCookie('authToken', result.accessToken, { expireDays: 30 })
      this.router.navigate(['/compelete-profile'])
    }).catch((err: Response) => {
      this.isRequestPending = false;
      if (err.status == 403) {
        this.serverMsg = err['error'].message;
      } else {
        this.serverMsg = "Unexpected error";
      }
      console.log("error ----", err);
    })
  }
  resetForm() {
    this.signupForm.reset();
    this.isFormSubmit = false;
    this.serverMsg = "";
  }
}
