import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // 5 - por minutos
  // 60 - por segundos
  // 1000 - por milisegundos  
  private readonly TIMEOUT = 5 * 60 * 1000;  
  private time: any;
 
  constructor(
    private router: Router, 
    private authService: AuthService
  ) {
    this.initListener();
    this.resetTimer();    
  }

   private initListener() {
    ['mousemove', 'keydown', 'click'].forEach(event =>
      window.addEventListener(event, () => this.resetTimer())
    );
  }

  private resetTimer() {
    clearTimeout(this.time);
    this.time = setTimeout(() => this.logout(), this.TIMEOUT);
  }

  private logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }

}
