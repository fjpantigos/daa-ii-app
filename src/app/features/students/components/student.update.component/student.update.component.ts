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
    this.loadData();
  }

  async loadData() {
    this.loading = true;

    this.studentService.getStudentById(this.studentId).subscribe({
      next: (student) => {
        this.student = student;
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

  async save() {
    this.loading = true;
    this.form.disable();  
    const student = this.form.value;  

    this.studentService.updateStudent(this.studentId, student).subscribe({
      next: () => {
        this.toastr.success('Estudiante modificado correctamente');
        this.router.navigate(['student/list']);
      },
      error: (error) => {
        console.error('Error al modificar estudiante:', error);
        const backendMessage = error?.error?.message || 'Error al modificar estudiante';
        this.toastr.error(backendMessage);
      },
      complete: () => {
        this.form.enable();
        this.loading = false;
      }
    });   
  }

  cancel() {
    this.router.navigate(['student/list']);
  }

}
