import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, AfterContentInit {
    currentDateMinutes: any;

    constructor(
        private spinner: NgxSpinnerService,
    ) { }

    ngOnInit() {
        this.currentDateMinutes = new Date().getMinutes();
    }

    ngAfterContentInit() {
        this.spinner.hide();
    }
}
