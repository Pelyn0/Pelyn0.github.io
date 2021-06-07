import { Component, OnInit, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() message: string;
  @Output() close: Subject<boolean>;
  private modalRef: BsModalRef;

  constructor(private bsModalRef: BsModalRef) {
    this.modalRef = bsModalRef;
  }

  ngOnInit() {
    this.close = new Subject();
  }

  public onCancel() {
    this.close.next(false);
    this.modalRef.hide();
  }

  public onConfirm() {
    this.close.next(true);
    this.modalRef.hide();
  }
}
