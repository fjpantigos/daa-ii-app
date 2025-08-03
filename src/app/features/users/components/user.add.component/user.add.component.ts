import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth';
import { User } from '../../../../core/interfaces/user';

@Component({
  selector: 'app-user.add.component',
  imports: [ReactiveFormsModule],
  templateUrl: './user.add.component.html',
  styleUrl: './user.add.component.scss',
})
export class UserAddComponent {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ]]
    });    
  }

  async save() {
    if (this.form.invalid) {
      this.toastr.error('Error formulario contiene errores');
    } 
    this.loading = true;
    this.form.disable();
    const { password, ...userData } = this.form.value;

    await this.authService.register(userData as Omit<User, 'uid' | 'active'>, password!);
    
    this.form.enable();
    this.loading = false;
    this.router.navigate(['user/register']);
  }

  cancel() {
    this.router.navigate(['user/register']);
  }
}
