import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { TermsPageComponent } from './pages/terms-page/terms-page.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'nosotros', component: AboutUsPageComponent },
    { path: 'contacto', component: ContactPageComponent },
    { path: 'terminos', component: TermsPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingPageRoutingModule { }