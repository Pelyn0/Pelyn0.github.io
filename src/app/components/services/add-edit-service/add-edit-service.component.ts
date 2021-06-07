import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../_services/service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Service } from '../../../_models/service.model';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'volur-add-edit-service',
  templateUrl: './add-edit-service.component.html',
  styleUrls: ['./add-edit-service.component.scss']
})
export class AddEditServiceComponent implements OnInit, OnDestroy {
  destroySubject: Subject<void> = new Subject();
  isPreviewSubmitted = false;
  settedService: Service;
  id: string;
  newService: FormGroup;
  baseModalService: BsModalService;
  messageModal: BsModalRef;
  error: string[] = [];
  isCreatedFormGroup = false;
  isPublishClicked = false;
  jsonText: any;
  currentDateMinutes: any;

  get invalidForm() {
    return this.newService.controls;
  }

  service: any = {};

  constructor(private serviceService: ServiceService,
              private router: Router,
              modalService: BsModalService,
              private activeRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) {
    this.baseModalService = modalService;
  }

  ngOnInit() {
    this.currentDateMinutes = new Date().getMinutes();
    this.isCreatedFormGroup = false;
    this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.spinner.show();
        this.settedService = this.serviceService.service.getValue();
        this.settedService ? this.init(this.settedService) : this.getExistedModel(this.id);
        this.serviceService.saveLastServiceId(+this.id);
      } else {
        this.settedService = this.serviceService.service.getValue();
        this.init(this.settedService);
      }
    });
  }
I
  createFromGroup(settedService: Service) {
    this.newService = new FormGroup({
      title: new FormControl(settedService ? settedService.title : '', [Validators.required]),
      description: new FormControl(settedService ? settedService.description : ''),
      tags: new FormControl(settedService ? settedService.tags : null, [Validators.required])
    });
    this.isCreatedFormGroup = true;
  }

  getExistedModel(id: string) {
    this.serviceService.getServiceById(id).pipe(takeUntil(this.destroySubject)).subscribe(data => {
      if (data) {
        this.settedService = data;
        this.init(this.settedService);
        this.settedService.id = parseInt(id, 10);
      }
    });
  }

  init(model: Service) {
    this.createFromGroup(model);
    this.spinner.hide();
  }

  preview() {
    this.isPreviewSubmitted = true;
    if (this.newService.invalid) {
      return;
    }
    this.serviceService.changeServices(new Service(
      this.settedService ? this.settedService.id ? this.settedService.id : null : null,
      this.newService.value.title,
      this.newService.value.description,
      this.newService.value.tags));
    this.router.navigate(['/service']);
  }

  backButton() {
    this.serviceService.changeServices(null);
    this.router.navigate(['/user-profile/services']);
  }

  publish() {
    this.spinner.show();
    this.service = new Service(
      null,
      this.newService.value.title,
      this.newService.value.description,
      this.newService.value.tags);
    this.isPublishClicked = true;
    if (this.settedService && this.settedService.id) {
      this.service.id = this.settedService.id;
      this.updateService(this.service);
    } else {
      this.createNewService(this.service);
    }
    this.serviceService.changeServices(null);
    
    setTimeout(() => {
      this.router.navigate(['/user-profile/services']);
    }
    , 1000);
  }

  updateService(modelToUpdate: Service) {
    this.serviceService.putService(modelToUpdate).pipe(takeUntil(this.destroySubject))
      .subscribe(() => {
          this.isPublishClicked = false;
          this.spinner.hide();
          this.toastr.success('Продукт оновлено', `Успішно оновлено`);
        },
        error => {
          this.isPublishClicked = false;
          this.spinner.hide();
          this.toastr.error(error.error.message, `Error ${error.status}`);
          this.setErrorMessage(error.error);
        }
      );
  }

  createNewService(modelToCreate: Service) {
    this.serviceService.postService(modelToCreate).pipe(takeUntil(this.destroySubject))
      .subscribe(() => {
          this.isPublishClicked = false;
          this.spinner.hide();
          this.toastr.success('Продукт створено', `Успішно створено`);
        },
        error => {
          this.isPublishClicked = false;
          this.spinner.hide();
          this.toastr.error(error.error.message, `Error ${error.status}`);
          this.setErrorMessage(error.error);
        }
      );
  }

  setErrorMessage(errors: any) {
    this.error = [];
    for (const key in errors) {
      if (Array.isArray(errors[key])) {
        errors[key].forEach(errorMes =>
          this.error.push(key + ' : ' + errorMes));
      } else {
        this.error.push(errors.message);
      }
    }
  }

  resetForm() {
    this.newService.get('title').reset();
    this.newService.get('description').reset();
    this.newService.get('tags').reset();
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }
}
