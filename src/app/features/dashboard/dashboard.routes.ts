import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '', 
        loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [AuthGuard] 
    },
    {
        path: 'index', 
        loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [AuthGuard] 
    }
];