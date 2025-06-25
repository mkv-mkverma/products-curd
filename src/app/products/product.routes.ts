import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductForm } from './product-form/product-form';
import { ProductDetail } from './product-detail/product-detail';

export const PRODUCT_ROUTES: Routes = [
  { path: '', component: ProductList },
  { path: 'add', component: ProductForm },
  { path: 'edit/:id', component: ProductForm },
  { path: ':id', component: ProductDetail },
];
