import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../service/product.service';
import { combineLatest, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private service = inject(ProductService);

  id$ = this.route.paramMap.pipe(map((pm) => +pm.get('id')!));
  product$ = this.id$.pipe(switchMap((id) => this.service.getById(id)));

  prevId$ = this.calcOffset(-1);
  nextId$ = this.calcOffset(1);

  private calcOffset(offset: number) {
    return combineLatest([this.service.productsStream$, this.id$]).pipe(
      map(([list, id]) => {
        const idx = list.findIndex((p) => p.id === id);
        const next = (idx + offset + list.length) % list.length;
        return list[next]?.id ?? id;
      })
    );
  }
}
