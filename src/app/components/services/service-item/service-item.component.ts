import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../../../_services/service.service';
//import { UpdateProperty } from '../../../_models/update-property.model';
import { Service } from '../../../_models/service.model';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Router } from '@angular/router';
//import { MessageModalErrorComponent } from '../../../components/modal-windows/message-modal-error/message-modal-error.component';

@Component({
  selector: 'volur-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss']
})
export class ServiceItemComponent {
  isAuthenticated: boolean;
  @Input() service: Service;
  @Output() deletedService = new EventEmitter<Service>();

  constructor(
    private serviceService: ServiceService,
    private authenticationService: AuthenticationService,
    public router: Router) {
    this.isAuthenticated = this.authenticationService.isAuthenticated();
  }

  deleteService(event: any) {
    event.stopPropagation();
    this.deletedService.emit(this.service);
  }
  
  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}