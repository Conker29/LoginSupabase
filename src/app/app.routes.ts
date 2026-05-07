import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'hola-mundo',
    loadComponent: () =>
      import('./pages/hola-mundo/hola-mundo.page').then(m => m.HolaMundoPage)
  }
];
