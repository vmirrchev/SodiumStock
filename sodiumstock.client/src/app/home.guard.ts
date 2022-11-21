import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    let url: string = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url: string): true | UrlTree {
    let val = localStorage.getItem('isLoggedIn');

    if (val != null && val == "true") {
      if (url == "") {
        return this.router.parseUrl('/home');
      } else {
        return true;
      }
    } else {
      return this.router.parseUrl('');
    }
  }
}
