import { Component, inject } from '@angular/core';
import { SearchBox } from '../search-box/search-box';
import { RouterLink } from '@angular/router';
import { ProductService } from '../service/product.service';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [SearchBox, RouterLink, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private service = inject(ProductService);

  searchTerm$ = new BehaviorSubject<string>('');
  search$ = this.searchTerm$.asObservable();

  products$ = combineLatest([
    this.service.productsStream$,
    this.searchTerm$,
  ]).pipe(
    map(([list, term]) =>
      term
        ? list.filter((p) =>
            p.product_name.toLowerCase().includes(term.toLowerCase())
          )
        : list
    )
  );
}
