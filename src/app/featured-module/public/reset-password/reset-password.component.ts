import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from '@app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPassForm: FormGroup;
  isFormSubmit: boolean = false;
  isRequestPending: boolean = false;
  validateLink: string;
  errorTxt: string;
  isVerfied: Boolean = false;
  isChecked: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.validateLink = paramMap.get('id');
      console.log("validateLink", this.validateLink)
      if (this.validateLink) this.validateResetLink()
    })
    this.resetPassForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    })
    // }, { validator: this.confirmPasswordValidator })
  }

  validateResetLink() {
    this.http.get('user/validateforgetlink/?id=' + this.validateLink).then((result: Response) => {
      this.isChecked = true;
      this.isVerfied = true;
    }).catch((err: Response) => {
      this.errorTxt = err['error'].message
      this.isChecked = true;
    })
  }

  confirmPasswordValidator(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }

  updatePassword(valid, value) {
    this.isFormSubmit = true;
    if (!valid) return;
    if (this.resetPassForm.controls.password.value != this.resetPassForm.controls.confirmPassword.value) {
      this.toastr.error("Passwords do not match", 'Error');
      return;
    }
    let obj = {
      newPassword: value.password,
      forgotToken: this.validateLink
    }
    this.http.post('/user/resetPassword', obj).then(success => {
      console.log("Success -----", success);
      this.toastr.success('Password updated successfully', 'Success');
      this.router.navigate(['/login']);
    }).catch(err => {
      console.log("Error -----", err);
      this.toastr.error(err['error'].message, 'Error');
    })
  }

}
