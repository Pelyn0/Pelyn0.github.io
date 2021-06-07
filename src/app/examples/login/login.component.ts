import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    destroySubject: Subject<void> = new Subject();
    test : Date = new Date();
    loginForm: FormGroup;
    focus;
    focus1;
    error = {
      statusText: ''
    };
    userName = '';
    password = '';
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        this.loginForm = new FormGroup({
          userName: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login() {
        if (this.loginForm.invalid) {
          Object.keys(this.loginForm.controls)
            .forEach(controlName => this.loginForm.controls[controlName].markAsTouched());
          return;
        }

        this.authenticationService.login(this.userName, this.password).pipe(takeUntil(this.destroySubject))
          .subscribe(
            () => {
              this.router.navigate(['/user-profile']);
            },
            error => {
              this.error = error;
              this.loginForm.controls.password.clearValidators();
              if (error.status === 404) {
                this.error.statusText = "Введено неправильний логін або пароль.";
              }
            }
          );
      }
      
  ngOnDestroy() {
    this.destroySubject.next();
  }
}
