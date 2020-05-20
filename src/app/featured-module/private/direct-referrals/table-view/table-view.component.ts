import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService, Response } from '@app/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {
  invitationForm: FormGroup;
  isFormSubmit: boolean = false;
  isRequestPending: boolean = false;
  currentModalId: string;
  constructor(private fb: FormBuilder, private http: HttpService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createInvitationForm();
  }
  createInvitationForm() {
    this.invitationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      inviteLink: ['aaaaa', Validators.required],
      name: ['']
    })
    this.fetchCurrentUser();
  }
  sendInvitation(valid, value) {
    this.isFormSubmit = true;
    if (!valid || this.isRequestPending) return;
    this.isRequestPending = true;

    let payload = {};
    Object.assign(payload, value);

    this.http.post('user/sendInvitation', payload, { isMultiPartFormData: true }).then((result: Response) => {
      this.invitationForm.reset();
      this.isRequestPending = false;
      this.isFormSubmit = false;
      this.closePopup(this.currentModalId)
      this.toastr.success('Invitation link sent', 'Success');
    }).catch((error: Response) => {
      this.toastr.error("Unable to send Invitation", 'Error');
      this.isRequestPending = false;
    })
  }
  fetchCurrentUser() {
    this.http.get('user/me').then((result: Response) => {
      // this.invitationForm.patchValue({ inviteLink: 'http://abc.mmcgbl.com/home/' + result.body.data._id });
      this.invitationForm.patchValue({ inviteLink: 'localhost:4200/home/' + result.body.data._id });
    }).catch((error: Response) => {
      this.toastr.error("Problem with your internet connection", 'Error')
    })
  }
  copyInvitationLink(code: string) {
    console.log(code)
    const el = document.createElement('textarea');
    el.value = code;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.toastr.success('Link copied', 'Success');
  }
  openPopup(modalId) {
    let id = '#' + modalId;
    this.currentModalId = modalId;
    $(id).modal({ show: true, backdrop: 'static', keyboard: false });
  }
  closePopup(modalId) {
    let id = '#' + modalId;
    $(id).modal('hide');
  }
}
