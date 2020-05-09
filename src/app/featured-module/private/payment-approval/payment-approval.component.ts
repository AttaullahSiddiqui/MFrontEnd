import { Component, OnInit } from '@angular/core';
import { HttpService, UtilityService, Response } from '@app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-approval',
  templateUrl: './payment-approval.component.html',
  styleUrls: ['./payment-approval.component.css']
})
export class PaymentApprovalComponent implements OnInit {
  paymentRecords: any = {};
  modifiedIdArray = [];
  isRequestPending: Boolean = false;
  showList: Boolean = false;

  constructor(
    private http: HttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void { this.getPayments() }

  getPayments() {
    this.http.get('payments/payment-records').then((result: Response) => {
      if (result.body.data && result.body.data.length > 0) {
        this.paymentRecords = result.body.data;
        console.log(this.paymentRecords)
        for (var key in this.paymentRecords) {
          if (this.paymentRecords.hasOwnProperty(key)) {
            this.paymentRecords[key]['activate'] = false;
          }
        }
        this.showList = true;
      }
    }).catch((error: Response) => {
      console.log("Error ----", error);
    })
  }
  logCheckbox(val: any) {
    if (val.activate) this.modifiedIdArray.push(val._id)
    else {
      const index: number = this.modifiedIdArray.indexOf(val._id);
      if (index !== -1) {
        this.modifiedIdArray.splice(index, 1);
      }
    }
  }
  updatePayments(statusTxt: string) {
    if (this.isRequestPending) return;
    if (!this.modifiedIdArray) return;
    this.isRequestPending = true

    this.http.post('payments/updatePayments', { paymentsIDs: this.modifiedIdArray, status: statusTxt }, { isMultiPartFormData: true }).then((result: Response) => {
      this.isRequestPending = false;
      this.showList = false;
      for (var key in this.paymentRecords) {
        if (this.paymentRecords.hasOwnProperty(key)) {
          var index = this.modifiedIdArray.indexOf(this.paymentRecords[key]._id);
          if (index != -1) this.paymentRecords[key].status = statusTxt;
        }
      }
      this.modifiedIdArray = [];
      setTimeout(() => {
        this.showList = true
      }, 500);
      this.toastr.success('Payments updated', 'Success');
    }).catch((error: Response) => {
      this.toastr.error("Unable to update List", 'Error');
      this.isRequestPending = false;
    })
  }
  downloadImage(imageUrl: string) {
    this.http.post('payments/download-image', { imageUrl: imageUrl }, { isMultiPartFormData: true }).then((result: Response) => {
      console.log(result.body)
    }).catch((error: Response) => {
      console.log("Error ----", error);
    })
  }
}
