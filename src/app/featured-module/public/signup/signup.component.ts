import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '@app/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup
  isFormSubmit: boolean = false;
  isRequestPending : boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  register(valid, value){
    // this.isFormSubmit = true;
    // if(!valid){
    //   return;
    // }
    // this.isRequestPending = true;
    // this.http.post('', value).then(success =>{
    //   this.resetForm();
    //   this.isRequestPending = false;
    // }).catch((err: Response) => {
    //   this.isRequestPending = false;
    // })
  }

  resetForm(){
    this.signupForm.reset();
    this.isFormSubmit = false;
  }



}
