import { inject, Injectable } from '@angular/core';
import { Auth, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);   
  
  public async login(email: string, password: string): Promise<UserCredential> {
    await setPersistence(this.auth, browserSessionPersistence);
    const credential: UserCredential = await signInWithEmailAndPassword(this.auth, email, password);

    return credential; 
  }

}
