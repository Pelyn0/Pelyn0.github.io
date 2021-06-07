import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthenticationService } from 'app/_services/authentication.service';
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import { EasingLogic } from 'ngx-page-scroll-core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    isUserAuthenticated = false;
    user = '';
    role = '';

    constructor(public location: Location,
        private router: Router,
        private element : ElementRef,
        private cd: ChangeDetectorRef,
        private authenticationService: AuthenticationService
        ) {
        this.sidebarVisible = false;
    }
    
    public myEasing: EasingLogic = (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) {
          return b;
        }
        if (t === d) {
          return b + c;
        }
        if ((t /= d / 2) < 1) {
          return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        }
    
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }

    ngOnInit() {
        this.authenticationService.isUserAuthenticated.subscribe(result => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
              this.user = decode<any>(currentUser.token).sub;
              this.role = decode<any>(currentUser.token).role;
            }
            this.isUserAuthenticated = result;
            this.cd.detectChanges();
          });
      
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.authenticationService.logout();
      }
      
    addLinks() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(this.isMainPage() || this.showLogOut()){
            return true;
        }
        else {
            return false;
        }
    }

    showLogOut(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(this.isMainPage() || this.isItemPage() || titlee.includes("user-profile")){
            return true;
        }
        else{
            return false;
        }
    }

    isItemPage(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        titlee = titlee.slice(0, titlee.indexOf('/'));
        if(titlee.includes("service"), titlee.includes("product")){
            return true;
        }
        else{
            return false;
        }
    }

    isMainPage(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(titlee){
            return false;
        }
        else {
            return true;
        }
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
}
