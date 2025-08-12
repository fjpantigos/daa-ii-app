import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentInterface } from '../../interfaces/student.interface';

@Component({
  selector: 'app-student.update.component',
  imports: [ReactiveFormsModule],
  templateUrl: './student.update.component.html',
  styleUrl: './student.update.component.scss'
})
export class StudentUpdateComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  student: StudentInterface | null = null;
  studentId: string;

  constructor(
  private fb: FormBuilder,
  private studentService: StudentService,
  private router: Router,
  private route: ActivatedRoute,
  private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      documentNumber: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.studentId =  this.route.snapshot.paramMap.get('uid')!;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async loadData() {
    this.loading = true;

    this.studentService.getStudentById(this.studentId).subscribe({
      next: () => {
        this.form.patchValue({
          documentNumber: this.student?.documentNumber,
          name: this.student?.name,
          lastName: this.student?.lastName,
          phone: this.student?.phone,
          email: this.student?.email,          
        })
      },
      error: (error) => {
        console.error('Error al cargar alumno:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });   
  }

  cancel() {
    this.router.navigate(['student/list']);
  }

}
