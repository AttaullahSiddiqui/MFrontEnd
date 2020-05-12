import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { HttpService, Response } from '@app/core';
declare var $: any;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  planForm: FormGroup;
  planRoundForm: FormGroup;
  isFormSubmit: boolean = false;
  isRequestPending : boolean = false;
  planNameAlreadyExist : boolean = false;
  currentModalObj = {
    id: '',
    type: '',
    planData: '',
    roundData: ''
  }
  allPlans = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.createPlanForm();
    this.createPlanRoundForm();
    this.getAllPlans();
  }

  createPlanForm(){
    this.planForm = this.fb.group({
      planName: ['', Validators.required],
      planPrice: ['', Validators.required],
      planRounds: ['', Validators.required],
      userEnrolled: ['', Validators.required]
    });
  }

  createPlanRoundForm(){
    this.planRoundForm = this.fb.group({
      planId: '',
      roundName: ['', Validators.required],
      roundAmount: ['', Validators.required],
      amountAutoReferrals: ['', Validators.required],
      userRecursive: ['', Validators.required]
    });
  }

  getAllPlans(){
    this.http.get('plan/all').then( (success: Response) => {
      this.allPlans = success.body.data;
    }).catch( (error: Response) => {
      console.log("Error in plan list ------", error);
    });
  }

  savePlan(valid, value){
    this.isFormSubmit = true;
    this.planNameAlreadyExist = false;
    if(!valid){
      return;
    }
    this.isRequestPending = true;
    this.http.post('plan/create', value).then( (success: Response) => {
      this.isRequestPending = false;
      this.getAllPlans();
      this.resetPlanForm();
      this.closePopup(this.currentModalObj.id);
    }).catch( (error: Response) => {
      this.isRequestPending = false;
      if(error.status == 409){
        this.planNameAlreadyExist = true;
      }
      console.log("Error ------", error);
    });
  }

  updatePlan(valid, value){
    this.isFormSubmit = true;
    this.planNameAlreadyExist = false;
    if(!valid){
      return;
    }
    this.isRequestPending = true;
    value.planId = this.currentModalObj.planData['_id'];
    this.http.put('plan/update', value).then( (success: Response) => {
      this.isRequestPending = false;
      this.getAllPlans();
      this.resetPlanForm();
      this.closePopup(this.currentModalObj.id);
    }).catch( (error: Response) => {
      this.isRequestPending = false;
      if(error.status == 409){
        this.planNameAlreadyExist = true;
      }
      console.log("Error ------", error);
    });
  }

  saveRound(valid, value){
    this.isFormSubmit = true;
    if(!valid){
      return;
    }
    this.isRequestPending = true;
    this.http.post('plan/add-round', value).then( (success: Response) => {
      this.isRequestPending = false;
      this.getAllPlans();
      this.resetPlanRoundForm();
      this.closePopup(this.currentModalObj.id);
    }).catch( (error: Response) => {
      this.isRequestPending = false;
      console.log("Error ------", error);
    });
  }

  updateRound(valid, value){
    this.isFormSubmit = true;
    if(!valid){
      return;
    }
    this.isRequestPending = true;
    value.roundId = this.currentModalObj.roundData['_id'];
    this.http.put('plan/update-round', value).then( (success: Response) => {
      this.isRequestPending = false;
      this.getAllPlans();
      this.resetPlanRoundForm();
      this.closePopup(this.currentModalObj.id);
    }).catch( (error: Response) => {
      this.isRequestPending = false;
      console.log("Error ------", error);
    });
  }

  openPopup(modalId, type, plan?, round?){
    let id = '#'+modalId;
    this.currentModalObj = {
      id: modalId,
      type: type,
      planData: plan || '',
      roundData: round || ''
    }
    if(type == 'update'){
      if(modalId == 'planModal'){
        this.planForm.setValue({
          planName: plan.planName,
          planPrice: plan.planPrice,
          planRounds: plan.planRounds,
          userEnrolled: plan.userEnrolled 
        })
      }else{
        this.planRoundForm.patchValue({
          planId: plan._id,
          roundName: round.roundName,
          roundAmount: round.roundAmount,
          amountAutoReferrals: round.amountAutoReferrals,
          userRecursive: round.userRecursive
        });
      }
    }else{
      if(modalId == 'planRoundModal'){
        this.planRoundForm.patchValue({
          planId: plan._id
        });
      }
    }
    $(id).modal({show: true, backdrop: 'static', keyboard: false});
  }

  closePopup(modalId){
    let id = '#'+modalId;
    $(id).modal('hide');
    this.currentModalObj = {id: '', type: '', planData: '', roundData: ''};
    this.resetPlanForm();
    this.resetPlanRoundForm();
  }

  resetPlanForm(){
    this.planForm.reset();
    this.isFormSubmit = false;
    this.planNameAlreadyExist = false;
  }

  resetPlanRoundForm(){
    this.planRoundForm.reset();
    this.isFormSubmit = false;
  }
}
