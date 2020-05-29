import { Component, OnInit } from '@angular/core';
import { HttpService, Response } from '@app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData = {
    balance: "...",
    credit: "...",
    debit: "...",
    withDraw: "...",
  };
  transactionsArr;
  showList: Boolean = false;
  constructor(private http: HttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void { this.getUserData(); this.getTransactions() }

  getUserData() {
    this.http.get('user/myAccountDetails').then((result: Response) => {
      this.userData = result.body.data;
    }).catch((error: Response) => {
      this.toastr.error("Unable to fetch Data, 'Error'");
    })
  }
  getTransactions() {
    this.http.get('user/myTransactions').then((result: Response) => {
      console.log(result.body.data)
      this.transactionsArr = result.body.data;
      this.showList = true;
    }).catch((error: Response) => {
      this.toastr.error("Unable to fetch Data, 'Error'");
    })
  }
}
