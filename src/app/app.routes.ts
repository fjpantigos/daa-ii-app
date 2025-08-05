import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'dashboard', pathMatch: 'full' 
    },
    { 
        path: 'dashboard', 
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) 
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'user',
        loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES)
    },
    {
        path: 'student',
        loadChildren: () => import('./features/students/student.routes').then(m => m.STUDENT_ROUTES)
    }
];
