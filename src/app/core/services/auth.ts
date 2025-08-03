import { inject, Injectable } from '@angular/core';
import { Auth, browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { UserService } from '../../features/users/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private userService = inject(UserService); 
  
  public async login(email: string, password: string): Promise<UserCredential> {
    await setPersistence(this.auth, browserSessionPersistence);
    const credential: UserCredential = await signInWithEmailAndPassword(this.auth, email, password);

    return credential; 
  }

  public async register(userSystem: Omit<User, 'uid' | 'active'>, password: string): Promise<void> {
    const cred: 
    UserCredential = await createUserWithEmailAndPassword(this.auth, userSystem.email, password);
    const userFull: User = {
      ...userSystem,
      uid: cred.user.uid,
      active: true
    };

  await this.userService.save(userFull);
  }

}
