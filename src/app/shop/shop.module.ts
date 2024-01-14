import { NgModule } from '@angular/core';

import { SliderComponent } from './components/slider/slider.component';
import { ShopAsideComponent } from './components/shop-aside/shop-aside.component';
import { ShopMainComponent } from './components/shop-main/shop-main.component';
import { ItemComponent } from './components/item/item.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CartComponent,
        SliderComponent,
        ShopPageComponent,
        ShopAsideComponent,
        ShopMainComponent,
        ItemPageComponent,
        CartPageComponent,
        ItemComponent],
    imports: [
        CommonModule,
        ShopRoutingModule,
        SharedModule,
        AuthModule,
        FormsModule,
    ],
    exports: [
        SliderComponent,
        ShopAsideComponent,
        ShopMainComponent,
        ItemComponent,
        CartPageComponent,
    ]
})
export class ShopModule { }