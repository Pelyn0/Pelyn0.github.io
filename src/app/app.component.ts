import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthenticationService } from './_services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    isUserAuthenticated = false;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor( 
        private authenticationService: AuthenticationService,
        private cd: ChangeDetectorRef,
        private spinner: NgxSpinnerService,
        private renderer : Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any, private element : ElementRef, public location: Location) {}
    
    ngOnInit() {
        
        this.router.events.subscribe(
            async event=>{
                if(event instanceof NavigationStart) {
                    this.spinner.show();
                }
                else if(event instanceof NavigationEnd) {
                    this.spinner.hide();
                }
            },
            error=>{
                this.spinner.hide();
                console.log(error);
            });
            
            this.authenticationService.isUserAuthenticated.subscribe(result => {
                this.isUserAuthenticated = result;
                this.cd.detectChanges();
              });

        var navbar : HTMLElement = this.element.nativeElement.children[1].children[0];
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            }else{
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();
        });
        this.renderer.listen('window', 'scroll', (event) => {
            const number = window.scrollY;
            if (number > 150 || window.pageYOffset > 150) {
                // add logic
                navbar.classList.remove('navbar-transparent');
            } else {
                // remove logic
                navbar.classList.add('navbar-transparent');
            }
        });
        var ua = window.navigator.userAgent;
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            var version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        if (version) {
            var body = document.getElementsByTagName('body')[0];
            body.classList.add('ie-background');

        }

    }

    removeFooter() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(titlee === 'login'){
            return false;
        }
        else {
            return true;
        }
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}
