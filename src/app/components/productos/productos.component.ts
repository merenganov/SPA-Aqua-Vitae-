import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ProductsService } from '../../services/product.service';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FaqComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
    title = 'Lista';
  products: any[] = [];
  filteredProducts: any[] = [];
  searchControl: FormControl = new FormControl();
  notFoundMessage: string = '';

  constructor(public productsService: ProductsService) {
    this.recuperarDatos();

    // Aquí aplicamos el debounce:
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.searchProduct(value);
    });
  }

  recuperarDatos(): void {
    console.log("Recuperando datos...");
    this.productsService.retornar().subscribe({
      next: this.successRequest.bind(this),
      error: (err) => {
        console.log(err);
      }
    });
  }

  successRequest(data: any): void {
    console.log(data);
    this.products = data.products;
    this.filteredProducts = [...this.products];
    console.log(this.products);
  }

  searchProduct(searchTerm: string) {
    if (searchTerm === '') {
      this.filteredProducts = [...this.products];
      this.notFoundMessage = '';
      return;
    }

    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (this.filteredProducts.length === 0) {
      this.notFoundMessage = 'Producto no encontrado';
    } else {
      this.notFoundMessage = '';
    }
  }

}
