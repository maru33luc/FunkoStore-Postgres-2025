import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

    ngOnInit() {
        AOS.init();
    }
}