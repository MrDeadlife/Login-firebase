import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /*
    //siguiente ruta donde el usuario quiere navegar
    next: ActivatedRouteSnapshot,
    //estado actual de la ruta 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
*/

  constructor(private auth: UsuarioService, private route: Router) {}
  canActivate(): boolean {
    if (this.auth.authenticated()) {
      return true;
    } else {
      this.route.navigateByUrl('/login');
      return false;
    }
  }
}
