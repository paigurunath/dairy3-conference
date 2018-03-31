import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsFilterPage } from './products-filter';

@NgModule({
  declarations: [
    ProductsFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsFilterPage),
  ],
})
export class ProductsFilterPageModule {}
