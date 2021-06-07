import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { ApiService } from './api.services';
import { Router } from '@angular/router';
import { UserRolesEnum } from '../_enums/user-roles';
/*import { ChangePassword } from '../_models/change-password.model';
import { ResetPassword } from '../_models/reset-password.model';*/
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  isUserAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentUser: any;
  private jwtHelper: JwtHelperService;
  private userRole: string;

  constructor(private apiService: ApiService, private router: Router) {
    this.jwtHelper = new JwtHelperService();
    this.init();
  }

  init() {
    const userJson = localStorage.getItem('currentUser');
    this.currentUser = userJson ? JSON.parse(userJson) : null;
    this.changeIsUserAuthenticated(this.isAuthenticated());
  }

  login(username: string, password: string) {
    return this.apiService.post<any>('api/personal/auth/login', {username: username, password: password}).pipe(
      map((user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser = user;
          this.router.navigate(['user-profile/']);
          this.changeIsUserAuthenticated(true);
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.changeIsUserAuthenticated(false);
    this.userRole = null;
    this.currentUser = null;
  }

  changeIsUserAuthenticated(status: boolean) {
    this.isUserAuthenticated.next(status);
  }

  isAuthenticated(): boolean {
    if (!this.currentUser) {
      return false;
    }
    const token = this.currentUser.token;
    const result = !this.jwtHelper.isTokenExpired(token);
    if (!result) {
      localStorage.removeItem('currentUser');
    }
    return result;
  }

  getUserRole(): string {
    if (!this.userRole) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        const userRoleType = currentUser.role;
        this.userRole = UserRolesEnum[userRoleType];
      }
    }
    return this.userRole;
  }

  /*changePassword(model: ChangePassword): Observable<any> {
    return this.apiService.put('api/personal/auth/change-password', model);
  }

  resetPassword(model: ResetPassword): Observable<any> {
    return this.apiService.post('api/personal/auth/reset-password', model);
  }

  forgotPassword(email: string): Observable<any> {
    return this.apiService.post(`api/personal/auth/generatetoken?email=${email}`, {email: email});
  }*/

}
