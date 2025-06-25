import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private products$ = new BehaviorSubject<Product[]>([]);

  productsStream$ = this.products$.asObservable(); // public read-only observable

  constructor() {
    this.http
      .get<Omit<Product, 'id'>[]>('/assets/products.json')
      .subscribe((json) =>
        this.products$.next(json.map((p, i) => ({ ...p, id: i + 1 })))
      );
  }

  add(p: Omit<Product, 'id'>) {
    const list = this.products$.value;
    this.products$.next([...list, { ...p, id: this.nextId(list) }]);
  }

  update(updated: Product) {
    this.products$.next(
      this.products$.value.map((p) => (p.id === updated.id ? updated : p))
    );
  }

  delete(id: number) {
    this.products$.next(this.products$.value.filter((p) => p.id !== id));
  }

  getById(id: number) {
    return this.productsStream$.pipe(
      map((product) => product.find((p) => p.id === id))
    );
  }

  private nextId(list: Product[]) {
    return list.length > 0 ? Math.max(...list.map((p) => p.id)) + 1 : 1;
  }
}
