import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./shared/layout/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'identity',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './routes',
      }).then(m => m.REMOTE_ROUTES),
  },
  {
    path: 'customers',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './routes',
      }).then(m => m.REMOTE_ROUTES),
  },
  {
    path: 'orders',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './routes',
      }).then(m => m.REMOTE_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4204/remoteEntry.js',
        exposedModule: './routes',
      }).then(m => m.REMOTE_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
