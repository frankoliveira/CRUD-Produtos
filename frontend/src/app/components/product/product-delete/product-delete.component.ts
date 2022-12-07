import { Component } from '@angular/core';
import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {

  product: Product = {
    name: '',
    price: 0
  }

  displayedColumns = ['id', 'name', 'price', 'action']

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let idFromRoute = this.route.snapshot.paramMap.get('id')
    const id = idFromRoute ? +idFromRoute : 0

    this.productService.readById(id).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void{

    this.productService.delete(this.product.id ? this.product.id : 0).subscribe(() => {
      this.productService.showMessage('Produto excluído')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void{
    this.router.navigate(['/products'])
  }
}
