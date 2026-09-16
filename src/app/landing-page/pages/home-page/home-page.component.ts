import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FunkosService } from 'src/app/services/funkos.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    title: string = 'ÚLTIMOS LANZAMIENTOS';

    constructor(
        private loginService: LoginService,
        private funkosService: FunkosService
    ) {}

    ngOnInit() {
        // Cargar todos los funkos al inicializar el componente
        this.funkosService.showAllFunkos();
    }
}