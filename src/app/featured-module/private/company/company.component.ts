import { Component, OnInit } from '@angular/core';
import { HttpService, Response } from '@app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  planData: any;
  myId: string;
  nextInLine: Number = 0;
  constructor(private http: HttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void { this.getPlanData() }

  getPlanData() {
    this.http.get('plan/getPLanData').then((result: Response) => {
      this.planData = result.body.data;
      this.getMyData()
    }).catch((error: Response) => {
      this.toastr.error("Unable to fetch Data, 'Error'");
    })
  }
  getMyData() {
    this.http.get('user/me').then((result: Response) => {
      this.myId = result.body.data._id;
      this.planData.rounds.every((el, index) => {
        for (var i = 0; i < el.registered.length; i++) {
          if (el.registered[i].userId == result.body.data._id) {
            this.nextInLine = i;
            return false;
          }
        }
        return true
      });
    })
  }
  calculatePercentage(a, b) {
    console.log(a)
    console.log(b)
    return 20;
  }
}
