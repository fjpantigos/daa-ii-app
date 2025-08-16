import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentInterface } from '../../interfaces/student.interface';

@Component({
  selector: 'app-student.component',
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  loading: boolean = false;
  private studentService = inject(StudentService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  students = signal<StudentInterface[]>([]);

  async ngOnInit() {
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (studenties) => {
        this.students.set(studenties);
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al obtener estudiantes');
        console.log(err);
      }
    });
  }

  addStudent() {
    this.router.navigate(['student/add']);
  }

  editStudent(uid:string){
    this.router.navigate([`student/update/${uid}`]); 
  }
}
