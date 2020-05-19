import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService, Response } from '@app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  isRequestPending: Boolean = false;
  isFormSubmit: Boolean = false;
  withDrawForm: FormGroup
  accountInfo = {
    debit: 'Loading',
    balance: 'Loading',
    credit: 'Loading',
    withDraw: 'Loading'
  }
  constructor(private fb: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchAccountDetails();
    this.creatWithDrawForm();
  }

  creatWithDrawForm() {
    this.withDrawForm = this.fb.group({
      method: ['Cash Mall', Validators.required],
      bankDetail: ['', Validators.required],
      accountNumber: ['', Validators.required],
      amount: [0, Validators.required]
    })
  }

  fetchAccountDetails() {
    this.http.get('user/myAccountDetails').then((result: Response) => {
      console.log(result.body.data)
      this.accountInfo.debit = result.body.data.debit;
      this.accountInfo.credit = result.body.data.credit;
      this.accountInfo.withDraw = result.body.data.withDraw;
      this.accountInfo.balance = result.body.data.balance;
    }).catch((error: Response) => {
      this.toastr.error("Unable to load Account details", 'Error');
    })
  }
  sendWithdrawRequest(valid, value) {
    this.isFormSubmit = true;
    if (!valid || this.isRequestPending) return;
    if (value.amount > this.accountInfo.balance) {
      this.toastr.error("You don't have enough balance in your account", 'Error');
      return;
    }
    this.isRequestPending = true;
    this.http.post('withdraw/generateRequest', value, { isMultiPartFormData: true }).then((result: Response) => {
      this.isRequestPending = false;
      this.isFormSubmit = false;
      this.withDrawForm.reset();
      this.toastr.success('Withdraw request sent successfully', 'Success');
    }).catch((error: Response) => {
      this.toastr.error("Unable to send withdraw request", 'Error');
      this.isRequestPending = false;
    })
  }
}
