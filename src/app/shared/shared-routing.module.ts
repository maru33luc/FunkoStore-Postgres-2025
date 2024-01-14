import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'login', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
    { path: 'register', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
    { path: 'shop/', loadChildren: () => import('../shop/shop.module').then(m => m.ShopModule) },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule { }