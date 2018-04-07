import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DairyserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DairyserviceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DairyserviceProvider Provider');
  }

  //define array
  private products:any = [{
    name: '9ct Silver Clips',
    image: 'assets/img/products/clips.jpg',
    rating: 4.5,
    price: 12
  },{
    name: 'Alphabet Charms',
    image: 'assets/img/products/alphabet.png',
    rating: 4.8,
    price: 24
  },{
    name: 'Christmas Charms',
    image: 'assets/img/products/christmas.webp',
    rating: 3.9,
    price: 25
  }];

  getProducts() {
    return this.products;
  }
}
