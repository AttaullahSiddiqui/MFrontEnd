import { Component, OnInit } from '@angular/core';
import { HttpService, UtilityService, Response } from '@app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-withdraw-approval',
  templateUrl: './withdraw-approval.component.html',
  styleUrls: ['./withdraw-approval.component.css']
})
export class WithdrawApprovalComponent implements OnInit {
  withdrawRequests: any = {};
  modifiedIdArray;
  isRequestPending: Boolean = false;
  showList: Boolean = false;
  constructor(private http: HttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void { this.fetchWithDrawRequests() }

  fetchWithDrawRequests() {
    this.http.get('withdraw/getList').then((result: Response) => {
      if (result.body.data && result.body.data.length > 0) {
        this.withdrawRequests = result.body.data;
        console.log(this.withdrawRequests)
        for (var key in this.withdrawRequests) {
          if (this.withdrawRequests.hasOwnProperty(key)) {
            this.withdrawRequests[key]['activate'] = false;
          }
        }
        this.showList = true;
      }
    }).catch((error: Response) => {
      this.toastr.error("Unable to fetch Data", 'Error');
    })
  }
  logCheckbox(val: any) {
    if (val.activate) {
      for (var key in this.withdrawRequests) {
        if (this.withdrawRequests.hasOwnProperty(key)) {
          if (val._id != this.withdrawRequests[key]._id) this.withdrawRequests[key].disable = true;
        }
      }
      this.modifiedIdArray = { ...val };
      this.modifiedIdArray['userId'] = val.userId._id;
    } else {
      for (var key in this.withdrawRequests) {
        if (this.withdrawRequests.hasOwnProperty(key)) {
          this.withdrawRequests[key].disable = false;
        }
      }
      this.modifiedIdArray = null
    }
  }
  updatePayments(statusTxt: string) {
    if (this.isRequestPending) return;
    if (!this.modifiedIdArray) return;
    this.isRequestPending = true

    this.http.post('withdraw/updateWithdraw', { paymentsIDs: this.modifiedIdArray, status: statusTxt }, { isMultiPartFormData: true }).then((result: Response) => {
      this.isRequestPending = false;
      this.showList = false;
      for (var key in this.withdrawRequests) {
        if (this.withdrawRequests.hasOwnProperty(key)) {
          this.withdrawRequests[key].disable = false;
          if (this.modifiedIdArray._id == this.withdrawRequests[key]._id) this.withdrawRequests[key].status = statusTxt;
        }
      }
      this.modifiedIdArray = null;
      setTimeout(() => {
        this.showList = true
      }, 500);
      this.toastr.success('Withdraw list updated', 'Success');
    }).catch((error: Response) => {
      this.toastr.error("Unable to update List", 'Error');
      this.isRequestPending = false;
    })
  }
}
