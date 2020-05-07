import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService, UtilityService, Response } from '@app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manual-payment',
  templateUrl: './manual-payment.component.html',
  styleUrls: ['./manual-payment.component.css']
})
export class ManualPaymentComponent implements OnInit {
  bankDetails: any = {};
  depositSlip: string = null;
  deposit: any = {};
  depositForm: FormGroup
  isFormSubmit: boolean = false;
  isRequestPending: boolean = false;
  imgFile: any;
  constructor(private fb: FormBuilder,
    private http: HttpService,
    private util: UtilityService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBankDetails();
    this.createdepositForm();
  }
  createdepositForm() {
    this.depositForm = this.fb.group({
      submitDate: ['', Validators.required],
      type: ['meezan', Validators.required],
      coupon: ['']
    })
  }
  getBankDetails() {
    this.http.get('bank-details').then((result: Response) => {
      if (result.body.data && result.body.data.length > 0) {
        let bankDetails = result.body.data[0];
        if (bankDetails['_id']) {
          this.bankDetails = bankDetails
        }
      }
    }).catch((error: Response) => {
      console.log("Error ----", error);
    })
  }
  removeImg() { 
    this.depositSlip = null;
    this.imgFile = null;
  }

  triggerInputFile() { (<HTMLElement>document.getElementById('inputFile')).click() }

  fileChangeEvent(event: any): void {
    this.imgFile = event.target.files[0];
    this.depositSlip = this.imgFile.name;
  }
  onDrop(ev: any) {
    ev.preventDefault()
    this.imgFile = ev.dataTransfer.files[0];
    this.depositSlip = this.imgFile.name
  }
  onDragOver(ev) { ev.preventDefault() }

  saveDeposit(valid, value) {
    this.isFormSubmit = true;
    if (!valid || !this.depositSlip || this.isRequestPending) return;
    this.isRequestPending = true;

    let payload = {};
    Object.assign(payload, value);
    let formData = new FormData();
    formData.append('submitDate', payload['submitDate']);
    formData.append('type', payload['type']);
    formData.append('coupon', payload['coupon']);
    formData.append('picture', this.imgFile);

    this.http.post('bank-details/depositSlip', formData, { isMultiPartFormData: true }).then((result: Response) => {
      this.depositForm.reset();
      this.depositSlip = null;
      this.imgFile = null;
      this.depositForm.patchValue({ type: 'meezan' });
      this.isRequestPending = false;
      this.isFormSubmit = false;
      this.toastr.success('Deposit slip saved', 'Success');
    }).catch((error: Response) => {
      this.toastr.error("Unable to save deposit slip", 'Error');
      this.isRequestPending = false;
    })
  }
}
