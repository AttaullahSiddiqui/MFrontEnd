import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService, UtilityService } from '@app/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup
  isFormSubmit: boolean = false;
  isRequestPending : boolean = false;
  serverMsg = "";

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private util: UtilityService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)] ]
    })
  }

  register(valid, value){
    this.isFormSubmit = true;
    this.serverMsg = "";
    if(!valid){
      return;
    }
    this.isRequestPending = true;
    let payload = {};
    Object.assign(payload, value);
    payload['registrationType'] = 'self';
    this.http.post('user/register', payload).then(success =>{
      this.resetForm();
      this.isRequestPending = false;
      let result = success.body.data;
      this.util.setCookie('authToken', result.accessToken, {expireDays: 30})
      this.router.navigate(['/compelete-profile'])
    }).catch((err: Response) => {
      this.isRequestPending = false;
      if(err.status == 403){
        this.serverMsg = err['error'].message;
      }else{
        this.serverMsg = "Unexpected error";
      }
      console.log("error ----",err);
    })
  }

  resetForm(){
    this.signupForm.reset();
    this.isFormSubmit = false;
    this.serverMsg = "";
  }



}
