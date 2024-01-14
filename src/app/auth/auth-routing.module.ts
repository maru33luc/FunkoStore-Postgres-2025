import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthLoginGuard } from '../shared/guards/auth-login.guard';
import { TermsComponent } from '../landing-page/components/terms/terms.component';
import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
    {path: 'reg', component: RegisterPageComponent, canActivate: [AuthLoginGuard]},
    {path: 'log', component: LoginPageComponent},
    {path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard]},
    {path: 'terms', component: TermsComponent},
    {path: '**', redirectTo: '/home'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }