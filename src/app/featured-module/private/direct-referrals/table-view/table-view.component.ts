import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService, Response } from '@app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {
  invitationForm: FormGroup;
  isFormSubmit: boolean = false;
  isRequestPending: boolean = false;
  modalReference: any;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private http: HttpService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchCurrentUser()
    this.createdepositForm();
  }
  createdepositForm() {
    this.invitationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      inviteLink: ['', Validators.required]
    })
    this.invitationForm.controls['inviteLink'].disable();
  }
  open(content) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
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
      this.modalReference.close();
      this.toastr.success('Invitation link sent', 'Success');
    }).catch((error: Response) => {
      this.toastr.error("Unable to send Invitation", 'Error');
      this.isRequestPending = false;
    })
  }
  fetchCurrentUser() {
    this.http.get('user/me').then((result: Response) => {
      // this.invitationForm.patchValue({ inviteLink: 'http://abc.mmcgbl.com/login/' + result.body.data._id });
      this.invitationForm.patchValue({ inviteLink: 'localhost:4200/login/' + result.body.data._id });
    }).catch((error: Response) => {
      this.toastr.error("Problem with your internet connection", 'Error')
    })
  }
  copyInvitationLink(code: string) {
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
}
