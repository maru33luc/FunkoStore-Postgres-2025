import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-admin-new-funko',
    templateUrl: './admin-new-funko.component.html',
    styleUrls: ['./admin-new-funko.component.css'],
})
export class AdminNewFunkoComponent {

    constructor(
        private funkosService: FunkosService,
        private router: Router
    ) { }

    saveFunko(funko: Funko) {
        this.funkosService.postFunko(funko);
        Swal.fire({
            text: "El producto ha sido creado",
            icon: "success",
        }).then(() => {
            this.router.navigate(['/admin']);
            this.scrollToTop();
        });
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }
}