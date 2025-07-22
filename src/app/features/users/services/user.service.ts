import { Injectable } from '@angular/core';
import { User } from '../../../core/interfaces/user';
import { collection, collectionData, doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  public readonly USER_COLECTION: string = 'users';

  constructor(private firestore: Firestore) { }

  public async getAll(): Promise<User[]> {
    try {
      const usuariosRef = collection(this.firestore, this.USER_COLECTION);
      const usuarios$ = collectionData(usuariosRef, { idField: 'uid' }) as Observable<User[]>;
      
      return await firstValueFrom(
        usuarios$.pipe(
          catchError(error => {
            console.error('Error cargando users:', error);
            return throwError(() => new Error('No se pudo cargar los usuarios'));
          })
        )
      );
    } catch (error) {
      console.error('Error en getAll:', error);
      throw this.handleError(error);
    }
  }

  public async getById(uid: string): Promise<User> {
    try {
      const ref = doc(this.firestore, this.USER_COLECTION, uid);
      const snapshot = await getDoc(ref);
      
      return this.parseUserData(snapshot);
    } catch (error) {
      console.error(`Error cargando user ${uid}:`, error);
      throw this.handleError(error);
    }
  }  

  public async save(userSystem: User): Promise<void> {
    try {      
      const ref = doc(this.firestore, this.USER_COLECTION, userSystem.uid);
      await setDoc(ref, this.sanitizeUserData(userSystem));
    } catch (error) {
      console.error('Error en grabado de user:', error);
      throw this.handleError(error);
    }
  }

  public async update(uid: string, data: Partial<User>): Promise<void> {
    try {
      const ref = doc(this.firestore, this.USER_COLECTION, uid);
      await updateDoc(ref, this.sanitizeUserData(data));
    } catch (error) {
      console.error(`Error actualizando user ${uid}:`, error);
      throw this.handleError(error);
    }
  }

  public async toggleActive(uid: string): Promise<void> {
    try {
      const user = await this.getById(uid);
      if (!user) {
        throw new Error('User no encontrado');
      }

      const ref = doc(this.firestore, this.USER_COLECTION, uid);
      await updateDoc(ref, { active: !user.active });
    } catch (error) {
      console.error(`Error modificando el estado del user ${uid}:`, error);
      throw this.handleError(error);
    }
  }  

  //Error personalizable
  private handleError(error: any): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error('Error desconocido');
  }

  //Convierte el valor entrante en User
  private parseUserData(snapshot: any): User {
    const data = snapshot.data();
    return {
      uid: snapshot.id,
      name: data['name'] || '',
      lastName: data['lastName'] || '',
      email: data['email'] || '',
      role: data['role'] || 'user',
      active: data['active'] ?? true,
    };
  } 

  //Envita el grabado de valores nulos
  private sanitizeUserData(userData: Partial<User>): any {
    return {
      name: userData.name?.trim() || '',
      lastName: userData.lastName?.trim() || '',
      email: userData.email?.trim() || '',
      role: userData.role || 'user',
      active: userData.active ?? true,
    };
  }  

}
