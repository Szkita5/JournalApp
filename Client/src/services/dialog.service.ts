import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public modal: NgbModal) {
  }

  public openDialog(dialog: any, large: boolean = false): NgbModalRef {
    const modalRef = this.modal.open(dialog, {size: large ? 'lg' : undefined});
    modalRef.result.catch(v => v);
    return modalRef;
  }
}
