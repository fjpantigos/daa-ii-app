import { Routes } from "@angular/router";

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '', 
        loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path: 'index', 
        loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard)
    }
];