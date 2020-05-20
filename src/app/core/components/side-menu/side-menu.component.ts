import { Component, OnInit, Input } from '@angular/core';
declare var $:any;


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  @Input() user:any;

  constructor() { }

  ngOnInit(): void {
 
  }

 

}
