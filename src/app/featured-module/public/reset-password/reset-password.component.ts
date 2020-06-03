import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from '@app/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPassForm: FormGroup;
  isFormSubmit : boolean = false;
  isRequestPending: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.resetPassForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: this.confirmPasswordValidator})
  }

  confirmPasswordValidator(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true};
    }
}

  updatePassword(valid, value){
    this.isFormSubmit = true;
    if(!valid){
      return;
    }
    this.http.put('/reset/password', {}).then( success => {
      console.log("Success -----",success);
    }).catch( err => {
      console.log("Error -----",err);
    })
  }

}
