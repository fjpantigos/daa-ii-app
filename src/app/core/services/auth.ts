import { inject, Injectable } from '@angular/core';
import { Auth, browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
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
    const uid = credential.user.uid;

    // Obtener datos personalizados del sistema (nombre, rol, etc.)
    const userSystem = await this.userService.getById(uid);

    // Guardar en localStorage
    localStorage.setItem('user', JSON.stringify({
      name: userSystem.name,
      email: userSystem.email,
      role: userSystem.role // si tuviera rol
    }));    

    return credential; 
  }

  public async logout(): Promise<void> {
    localStorage.removeItem('user');
    await signOut(this.auth);
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
