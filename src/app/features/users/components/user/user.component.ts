import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../../core/interfaces/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [NgClass],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  loading = false;

  users = signal<User[]>([]);

  async ngOnInit() {
    this.loading = true;
    const usuarios = await this.userService.getAll();
    this.users.set(usuarios);
    this.loading = false;
  }

  addUser() {
    this.router.navigate(['user/add']);
  }

  editUser(uid: string) {
    this.router.navigate([`user/update/${uid}`]);     
  }  

  async stateUser(uid: string) {
    try {
      await this.userService.toggleActive(uid);
      
      this.users.update(currentUsers => 
        currentUsers.map(user => 
          user.uid === uid ? { ...user, active: !user.active } : user
        )
      );
    } catch (error) {
      this.toastr.error('Error al cambiar estado');
    }
  }  

}
