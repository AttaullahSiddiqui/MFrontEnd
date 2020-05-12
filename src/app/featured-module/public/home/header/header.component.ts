import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }


  
  ngOnInit(): void {
    
    // Open links in mobiles
function handleSmallScreens() {
  document.querySelector('.navbar-toggler')
    .addEventListener('click', () => {
    let navbarMenu = document.querySelector('.navbar-menu')

    // if (navbarMenu.style.display === 'flex') {
    //   navbarMenu.style.display = 'none'
    //   return
    // }

    // navbarMenu.style.display = 'flex'
  })
}

handleSmallScreens()
  }

}
