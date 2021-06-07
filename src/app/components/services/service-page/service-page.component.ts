import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from '../../../_services/service.service';
import { Service } from '../../../_models/service.model';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { PublishTypeEnum } from 'app/_enums/publish-type';
//import { ModalAskTheRecruiterComponent } from '../../../components/modal-windows/ask-the-recruiter/modal-ask-the-recruiter.component';
//import { ApplyNowModalComponent } from '../../../components/modal-windows/apply-now-modal/apply-now-modal.component';

@Component({
  selector: 'volur-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  public aboutService: string;
  public id: string;
  public description: string;
  public service: Service;
  public servicePage: Service[];
  public repoUrl: string;
  public isPreview: boolean;
  public hide;
  public isAdmin;
  private bsModalRef: BsModalRef;
  currentDateMinutes: any;
  typeToPublish = PublishTypeEnum;

  constructor(private serviceService: ServiceService, private route: ActivatedRoute, private router: Router,
    private modalService: BsModalService, private meta: Meta) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.isPreview = !this.id;
    this.router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate' && this.bsModalRef) {
        this.bsModalRef.hide();
      }
    });
  }

  getServices() {
    this.subscription = this.serviceService.getAllServices()
      .subscribe(data => {
        this.servicePage = data;
        this.service = this.servicePage.find(item => item.id === parseInt(this.id, 10));
          this.serviceService.saveLastServiceId(this.service.id);
        if (!this.service) {
          this.router.navigate(['/']);
        } else {
          this.aboutService = `${this.service.title} \n${this.service.tags}`;
          this.meta.addTag({ name: 'description', content: this.aboutService });
        }
      }
      );
  }

  showPreviewService() {
    this.service = this.serviceService.service.getValue();
  }

  ngOnInit() {
    this.currentDateMinutes = new Date().getMinutes();
    //if (localStorage.getItem('currentUser')) {
      this.isAdmin = true;
    //}
    if (this.isPreview) {
      this.hide = true;
      this.showPreviewService();
    } else {
      this.hide = false;
      this.getServices();
      this.repoUrl = window.location.origin + this.router.url;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public askRecruiterModal(): void {
    //this.bsModalRef = this.modalService.show(ModalAskTheRecruiterComponent);
    this.bsModalRef.content.messageType = 'default';
    this.bsModalRef.content.vacancyId = this.id;
  }

  public applyNowModal(): void {
    //this.bsModalRef = this.modalService.show(ApplyNowModalComponent);
    this.bsModalRef.content.vacancyId = this.id;
  }
}
