import { Routes } from "@angular/router";

export const USERS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/user/user.component').then(m => m.UserComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/user/user.component').then(m => m.UserComponent)
    }    
]