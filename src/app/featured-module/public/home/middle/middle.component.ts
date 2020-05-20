import { Component, OnInit } from '@angular/core';
import { HttpService, Response } from '@app/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-middle',
  templateUrl: './middle.component.html',
  styleUrls: ['./middle.component.css']
})
export class MiddleComponent implements OnInit {
  plans;
  referralId: string = null;
  constructor(private http: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchPlans();
    this.route.paramMap.subscribe(paramMap => {
      this.referralId = paramMap.get('id');
    })
  }

  fetchPlans() {
    this.http.get('plan/all').then((result: Response) => {
      this.plans = result.body.data;
      for (let key in this.plans) {
        var totalEarning = 0;
        for (var i = 0; i < this.plans[key].rounds.length; i++) {
          totalEarning += this.plans[key].rounds[i].roundAmount
        }
        this.plans[key].totalEarning = totalEarning
      }
    }).catch((error: Response) => {
      console.log("Unable to fetch Data, 'Error'");
    })
  }
  buyPlan(id: string) {
    if (this.referralId) this.router.navigate(['/login', id, this.referralId]);
    else this.router.navigate(['/login', id]);
  }
}
