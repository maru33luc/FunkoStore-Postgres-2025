import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    title: string = 'ÚLTIMOS LANZAMIENTOS';

   
}