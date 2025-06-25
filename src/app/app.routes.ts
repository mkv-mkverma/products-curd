import { Routes } from '@angular/router';
import { PRODUCT_ROUTES } from './products/product.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', children: PRODUCT_ROUTES },
  { path: '**', redirectTo: '' },
];
