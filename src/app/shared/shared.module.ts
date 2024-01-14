import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';

import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        IfAuthenticatedDirective,
    ],
    imports: [
        CommonModule,
        SharedRoutingModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        IfAuthenticatedDirective,
    ]
})
export class SharedModule { }