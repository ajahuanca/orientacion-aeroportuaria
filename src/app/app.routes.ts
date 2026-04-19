import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./home/home.page').then((m) => m.HomePage),
    },
  {
    path: 'scanner',
    loadComponent: () => import('./features/scanner/scanner.page').then( m => m.ScannerPage)
  },
  {
    path: 'results',
    loadComponent: () => import('./features/results/results.page').then( m => m.ResultsPage)
  },
];
