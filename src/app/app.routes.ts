import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/grocery/grocery-module')
        .then(m => m.GroceryModule)
  }
];