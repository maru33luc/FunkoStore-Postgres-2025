import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginGuard } from './shared/guards/auth-login.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
    {path: 'home', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)},
    {path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
    {path: 'cart', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
    {path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [AuthLoginGuard]},
    {path: 'register', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate: [AdminGuard]},
    {path: '**', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }