import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpService, Response } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myData = {};
  profileForm: FormGroup
  isFormSubmit: boolean = false;
  isRequestPending: boolean = false;
  countries = [];
  countryCodesWithFlags: any[] = [];
  cities = [];
  constructor(private fb: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createProfileForm();
    this.getCountriesList();
    this.getMyData();
    this.profileForm.get('country').valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(val => {
      if (val != -1) {
        this.getCities(val);
      } else {
        this.cities = [];
        this.profileForm.patchValue({
          city: -1
        })
      }
    });
  }

  getMyData() {
    this.http.get('user/me').then((result: Response) => {
      this.myData = result.body.data;
      this.profileForm.patchValue({
        email: this.myData['email'],
        password: this.myData['password'],
        fullName: this.myData['fullName'],
        phoneCountryCode: this.myData['phoneCountryCode'],
        phoneNo: this.myData['phoneNo'],
        country: this.myData['country'],
        city: this.myData['city'],
      })
    })
  }
  createProfileForm() {
    this.profileForm = this.fb.group({
      email: ['', Validators.required],
      password: [''],
      fullName: ['', Validators.required],
      phoneCountryCode: ['92', Validators.required],
      phoneNo: ['', Validators.required],
      country: [-1, [Validators.required, this.validateCountryCity]],
      city: [-1, [Validators.required, this.validateCountryCity]]
    })
  }
  validateCountryCity(control: AbstractControl) {
    if (control.value == -1) {
      return { validId: true };
    }
    return null;
  }
  getCountriesList() {
    this.http.get('country/list').then(success => {
      this.countries = success.body.data;
    }).catch((err: Response) => {
      alert("Error in fetching countries");
    })
  }

  getCities(name) {
    this.http.get('country/cities?name=' + name).then(success => {
      this.cities = success.body.data;
    }).catch((err: Response) => {
      console.log("error ----", err);
      alert("Error in fetching cities");
    })
  };
  onCountryChange(event) {
    this.profileForm.patchValue({
      phoneCountryCode: event.dialCode,
      city: ''
    })
  }
  save(valid, value) {
    this.isFormSubmit = true;
    if (!valid) return;
    this.isRequestPending = true;
    delete value.password
    this.http.put('user/updateProfile', value).then((result: Response) => {
      this.isRequestPending = false;
      this.toastr.success('Changes saved successfully', 'Success');
    }).catch((error: Response) => {
      this.isRequestPending = false;
      this.toastr.error("Error in saving Details", 'Error');
    })
  }
}
