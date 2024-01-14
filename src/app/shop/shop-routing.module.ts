import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';


const routes: Routes = [
    { path: '', component: ShopPageComponent },
    { path: 'cart', component: CartPageComponent },
    { path: ':id', component: ItemPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }