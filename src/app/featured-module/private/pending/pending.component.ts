import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService, UtilityService, Response } from '@app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  bankDetailsForm: FormGroup
  isFormSubmit: boolean = false;
  isRequestPending: boolean = false;
  serverMsg = "";

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private util: UtilityService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.createBankDetailsForm();
    this.getBankDetails();
  }

  createBankDetailsForm() {
    this.bankDetailsForm = this.fb.group({
      _id: '',
      bankName: ['', Validators.required],
      accountTitle: ['', Validators.required],
      accountNumber: ['', Validators.required],
      withdrawalIssue: ['', Validators.required],
      newRegistration: ['', Validators.required],
      techSupport: ['', Validators.required]
    })
  }

  getBankDetails() {
    this.http.get('bank-details').then((result: Response) => {
      if (result.body.data && result.body.data.length > 0) {
        let bankDetails = result.body.data[0];
        if (bankDetails['_id']) {
          this.bankDetailsForm.patchValue({
            _id: bankDetails['_id'],
            bankName: bankDetails['bankName'],
            accountTitle: bankDetails['accountTitle'],
            accountNumber: bankDetails['accountNumber'],
            withdrawalIssue: bankDetails['withdrawalIssue'],
            newRegistration: bankDetails['newRegistration'],
            techSupport: bankDetails['techSupport']
          })
        }
      }
    }).catch((error: Response) => {
      console.log("Error ----", error);
      this.toastr.error("Unable to fetch Bank details", 'Error');
    })
  }

  save(valid, value) {
    this.isFormSubmit = true;
    if (!valid) {
      return;
    }
    this.isRequestPending = true;
    this.http.put('bank-details/update', value).then((result: Response) => {
      // console.log("result ---", result.body.data);
      let data = result.body.data;
      if (data.type == 'insert') {
        this.bankDetailsForm.patchValue({
          _id: result.body.data.id
        })
      }
      this.isRequestPending = false;
      this.toastr.success('Details saved successfully', 'Success');
    }).catch((error: Response) => {
      console.log("Error ---", error);
      this.isRequestPending = false;
      this.toastr.error("Error in saving Details", 'Error');
    })
  }
}
