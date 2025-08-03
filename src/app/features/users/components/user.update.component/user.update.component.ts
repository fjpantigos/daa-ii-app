import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../core/interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user.update.component',
  imports: [ReactiveFormsModule],
  templateUrl: './user.update.component.html',
  styleUrl: './user.update.component.scss'
})
export class UserUpdateComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  userId: string;
  userData: User | null = null;    

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
    this.userId = this.route.snapshot.paramMap.get('uid')!;
  }  

  async ngOnInit() {
    await this.loadUserData();
  }

  async loadUserData() {
    this.loading = true;
    try {
      this.userData = await this.userService.getById(this.userId);
      
      if (this.userData) {
        this.form.patchValue({
          name: this.userData.name,
          lastName: this.userData.lastName,
          email: this.userData.email,
          role: this.userData.role
        });
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    } finally {
      this.loading = false;
    }    
  }

  async save() {
    if (this.form.invalid) {
      this.toastr.error('Error formulario contiene errores');
    } 
    this.loading = true;
    this.form.disable();
    const userData = this.form.value;
    
    await this.userService.update(this.userId, userData);
    
    this.form.enable();
    this.loading = false;
    this.router.navigate(['user/register']);
  }  

  cancel() {
    this.router.navigate(['user/register']);
  }

}
