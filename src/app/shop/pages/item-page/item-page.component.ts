import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FunkosService } from 'src/app/services/funkos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-item-page',
    templateUrl: './item-page.component.html',
    styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent {
    title: string = 'PRODUCTOS RELACIONADOS';
    selectedItemLicence: string | undefined;
    selectedItemLicence$: Observable<string> | undefined;

    constructor(
        private funkoService: FunkosService,
        private activatedRoute: ActivatedRoute
    ){
        this.obtenerIdItem();
    }

    obtenerIdItem() {
        this.activatedRoute.paramMap.subscribe(async(params) =>  {
            window.scroll(0,0);
            let id = params.get('id');
            const resp = await this.funkoService.getFunko(parseInt(id || ''));
            this.selectedItemLicence = resp?.licence;
        });
    }
}