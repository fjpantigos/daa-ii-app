import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";

export const STUDENT_ROUTES: Routes = [
    {
        path: '', 
        loadComponent: () => import('./components/student.component/student.component').then(m => m.StudentComponent),
        canActivate: [AuthGuard] 
    },
    {
        path: 'list', 
        loadComponent: () => import('./components/student.component/student.component').then(m => m.StudentComponent),
        canActivate: [AuthGuard] 
    },        
]