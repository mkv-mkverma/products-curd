import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../service/product.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../models/product.model';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ProductService);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    id: this.fb.control<number | null>(null), // nullable field
    product_name: ['', Validators.required],
    brand: [''],
    category: [''],
    price: [0, Validators.min(0)],
    in_stock: [true],
  });

  isEdit = false;

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.isEdit = true;
      this.service
        .getById(+param)
        .pipe(take(1))
        .subscribe((p) => {
          if (p) {
            this.form.patchValue(p);
          } else {
            console.error('Product not found');
          }
        });
    }
  }

  save() {
    const value = this.form.getRawValue();
    if (this.isEdit) {
      this.service.update(value as Product);
    } else {
      const { id, ...rest } = value;
      this.service.add(rest as Omit<Product, 'id'>);
    }
    this.router.navigate(['/products']);
  }

  remove() {
    this.service.delete(this.form.value.id!);
    this.router.navigate(['/products']);
  }
}
