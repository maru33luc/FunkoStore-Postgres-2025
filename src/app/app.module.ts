import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FunkosService } from './services/funkos.service';

export function initFunkos(funkosService: FunkosService) {
  return () => funkosService.levantarFunkos();
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      FunkosService,
      {
        provide: APP_INITIALIZER,
        useFactory: initFunkos,
        deps: [FunkosService],
        multi: true
      }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }