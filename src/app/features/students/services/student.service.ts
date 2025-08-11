import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentInterface } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/v1/instituto/student/';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<StudentInterface[]> {
    return this.http.get<StudentInterface[]>(this.apiUrl);
  } 

  getStudentById(id: string): Observable<StudentInterface> {
    return this.http.get<StudentInterface>(`${this.apiUrl}${id}`);
  }

  createStudent(student: StudentInterface): Observable<StudentInterface> {
    student.uid = crypto.randomUUID();
    student.active = 1;
    return this.http.post<StudentInterface>(this.apiUrl, student, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  updateStudent(id: string, student: StudentInterface): Observable<StudentInterface> {
    return this.http.put<StudentInterface>(`${this.apiUrl}/${id}`, student, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }  
}
