import { Component, OnInit } from '@angular/core';
import { HttpService, Response } from '@app/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-middle',
  templateUrl: './middle.component.html',
  styleUrls: ['./middle.component.css']
})
export class MiddleComponent implements OnInit {
  plans;
  referralId: string = null;
  contactForm: FormGroup;
  isFormSubmit: boolean = false;
  isRequestPending: boolean = false;
  constructor(private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchPlans();
    this.createContactForm();
    this.route.paramMap.subscribe(paramMap => {
      this.referralId = paramMap.get('id');
    })
  }
  createContactForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
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
  submitContactForm(valid, value) {
    this.isFormSubmit = true;
    if (!valid || this.isRequestPending) return;
    this.isRequestPending = true;

    this.http.post('user/contactMessage', value, { isMultiPartFormData: true }).then((result: Response) => {
      this.contactForm.reset();
      this.isRequestPending = false;
      this.isFormSubmit = false;
      this.toastr.success('Message sent', 'Success');
    }).catch((error: Response) => {
      this.toastr.error("Unable to send message", 'Error');
      this.isRequestPending = false;
    })
  }
}
