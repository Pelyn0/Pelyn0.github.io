import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthenticationService } from '../../../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'app/_models/service.model';
import { ServiceService } from 'app/_services/service.service'
import { Subscription } from 'rxjs';
import { ConfirmModalComponent } from 'app/components/confirm-modal/confirm-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'volur-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit, OnDestroy {
  destroySubject: Subject<void> = new Subject();
  private messageModal: BsModalRef;

  services: Service[] = [];
  keyWords: string = null;
  userFilter = [];
  inputModelChanged: Subject<string> = new Subject<string>();
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private baseModalService: BsModalService,
              public serviceService: ServiceService,
              public router: Router,
              private authenticationService: AuthenticationService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) {
  }
  
  ngOnInit() {
    this.subscription = this.serviceService.getAllServices().pipe(takeUntil(this.destroySubject))
    .subscribe(
        services => {
        this.services = services;
        }, error => {
            if(error.status == "404"){
                this.toastr.error("Помилка при загрузці продуктів", `Error ${error.status}`);
            }
        }
    );
  }

  deleteService(service: Service) {
      this.messageModal = this.baseModalService.show(ConfirmModalComponent,
        {class: 'h-100 d-flex align-items-center justify-content-center'});
      this.messageModal.content.message = 'послуга: ' + service.title;
      (<ConfirmModalComponent>this.messageModal.content).close.pipe(takeUntil(this.destroySubject)).subscribe(result => {
        if (result) {
          this.spinner.show();
          this.serviceService.deleteService(service.id).pipe(takeUntil(this.destroySubject)).subscribe(() => {
              const index: number = this.services.indexOf(service);
              if (index !== -1) {
                this.services.splice(index, 1);
              }
            },
            error => {
              if (error.error.message) {
                this.spinner.hide();
                this.toastr.error(error.error.message, `Error ${error.status}`);
              }
            });
        }
        this.spinner.hide();
      });
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }
}
