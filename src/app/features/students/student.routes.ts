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
    {
        path: 'add',
        loadComponent: () => import('./components/student.add.component/student.add.component').then(m => m.StudentAddComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'update/:uid',
        loadComponent: () => import('./components/student.update.component/student.update.component').then(m => m.StudentUpdateComponent),
        canActivate: [AuthGuard]
    }        
]