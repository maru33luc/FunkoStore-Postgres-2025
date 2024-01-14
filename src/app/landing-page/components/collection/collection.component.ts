import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit{
    
    constructor() { }

    ngOnInit() {
        AOS.init();
    }

    scrollToTop() {
        window.scroll(0, 0);
    }
}