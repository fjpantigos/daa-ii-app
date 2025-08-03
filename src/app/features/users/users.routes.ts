import { Routes } from "@angular/router";

export const USERS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/user/user.component').then(m => m.UserComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/user/user.component').then(m => m.UserComponent)
    },
    {
        path: 'add',
        loadComponent: () => import('./components/user.add.component/user.add.component').then(m => m.UserAddComponent)
    },
    {
        path: 'update/:uid',
        loadComponent: () => import('./components/user.update.component/user.update.component').then(m => m.UserUpdateComponent)
    }
]