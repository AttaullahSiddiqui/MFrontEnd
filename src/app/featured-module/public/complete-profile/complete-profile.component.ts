import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '@app/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.css']
})
export class CompleteProfileComponent implements OnInit {


  profileForm: FormGroup
  isFormSubmit: boolean = false;
  isRequestPending : boolean = false;
  serverMsg = "";
  countries = [];
  countryCodesWithFlags: any[] = [];
  cities = [];

  


  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCountriesList();
    this.createProfileForm();
    this.profileForm.get('country').valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(val => {
      if(val != -1){
        this.getCities(val);
      }else{
        this.cities = [];
        this.profileForm.patchValue({
          city : -1
        })
      }
     })
     this.getCountryCodeWithFlag();
    
    
  }

  createProfileForm(){
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneCountryCode: ['92', Validators.required],
      phoneNo: ['', Validators.required],
      country: [-1, Validators.required],
      city: [-1, Validators.required]
    })
  };

  getCountriesList(){
    this.http.get('country/list').then(success =>{
      this.countries = success.body.data;
      console.log("Countries List -----",this.countries);
    }).catch((err: Response) => {
      console.log("error countries ----",err);
      alert("Error in fetching countries");
    })
  }

  getCities(name){
    this.http.get('country/cities?name='+name).then(success =>{
      this.cities = success.body.data;
      console.log("Cities List -----",this.cities);
    }).catch((err: Response) => {
      console.log("error ----",err);
      alert("Error in fetching cities");
    })
  };

  getCountryCodeWithFlag(){
    this.http.getCountryCodeWithFlag().then(data => {
      this.countryCodesWithFlags = data;
      console.log("Data ----",data);
    })
  }
  
  saveProfile(valid, value){
    this.isFormSubmit = true;
    if(!valid){
      return;
    }
    console.log(value);
    // this.isRequestPending = true;
    // this.http.post('user/complete-profile', value).then(success =>{
    //   this.isRequestPending = false;
    //   this.router.navigate(['/phone-verification'])
    // }).catch((err: Response) => {
    //   this.isRequestPending = false;
    //   this.serverMsg = "Unexpected error";
    //   console.log("error ----",err);
    // })
  }

  onCountryChange(event){
    this.profileForm.patchValue({
      phoneCountryCode: event.dialCode
    })     

  }
  
 


}
