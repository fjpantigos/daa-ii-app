import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student.add.component',
  imports: [ReactiveFormsModule],
  templateUrl: './student.add.component.html',
  styleUrl: './student.add.component.scss',
})
export class StudentAddComponent {
  form!: FormGroup;
  loading = false;
  photoUrl: string | null = null; // Previsualización
  selectedFile: File | null = null; // Archivo seleccionado  

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      documentNumber: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.photoUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);

      // Subir la imagen al servidor
      this.uploadPhoto(this.selectedFile);
    }
  }  

  uploadPhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);

  }

  async save() {
    this.loading = true;
    this.form.disable();  
    const student = this.form.value;  

    this.studentService.createStudent(student).subscribe({
      next: () => {
        this.toastr.success('Estudiante registrado correctamente');
        this.router.navigate(['student/list']);
      },
      error: (error) => {
        console.error('Error al registrar estudiante:', error);
        const backendMessage = error?.error?.message || 'Error al registrar estudiante';
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
