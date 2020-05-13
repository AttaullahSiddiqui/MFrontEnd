import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '@app/core';

@Component({
  selector: 'app-phone-verfication',
  templateUrl: './phone-verfication.component.html',
  styleUrls: ['./phone-verfication.component.css']
})
export class PhoneVerficationComponent implements OnInit {

  phoneVerificationForm: FormGroup
  isFormSubmit: boolean = false;
  isRequestPending : boolean = false;
  serverMsg = "";

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.phoneVerificationForm = this.fb.group({
      verficationCode: ['', Validators.required]
    })
  }

  verfiyPhoneNo(valid, value){
    this.isFormSubmit = true;
    this.serverMsg = "";
    if(!valid){
      return;
    }
    this.isRequestPending = true;
    this.http.post('user/verify-phone', value).then(success =>{
      this.isRequestPending = false;
      this.router.navigate(['/payment/manual'])
    }).catch((err: Response) => {
      this.isRequestPending = false;
      if(err.status == 409){
        this.serverMsg = err['error'].message;
      }else{
        this.serverMsg = "Unexpected error";
      }
      console.log("error ----",err);
    })
  }

  resendVerficationCode(){
    this.isRequestPending = true;
    this.http.get('user/resend-verfication-code').then(success =>{
      this.isRequestPending = false;
    }).catch((err: Response) => {
      this.isRequestPending = false;
      this.serverMsg = "Unexpected error";
      console.log("error ----",err);
    })
  }

}
