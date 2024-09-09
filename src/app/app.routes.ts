import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/pre-loading/pre-loading.component').then(
        (c) => c.PreLoadingComponent,
      ),
    data: { animation: 'preLoading' },
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./features/header/header.component').then(
        (c) => c.HeaderComponent,
      ),
    data: { animation: 'heroList' },
  },
];
