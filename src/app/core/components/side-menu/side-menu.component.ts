import { Component, OnInit, Input } from '@angular/core';

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

  openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  
  closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
 

}
