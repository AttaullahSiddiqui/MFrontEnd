import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-not-found404',
  templateUrl: './not-found404.component.html',
  styleUrls: ['./not-found404.component.css']
})
export class NotFound404Component implements OnInit {

  constructor() { 
 
    
  }

  ngOnInit(): void {
    $('#menu li a').on('click', function(){
    $('li a.current').removeClass('current');
    $(this).addClass('current');
});
  
  }

}

