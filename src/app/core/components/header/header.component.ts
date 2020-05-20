import { Component, OnInit } from '@angular/core';
import { UtilityService } from '@app/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private util: UtilityService, private router: Router) { }

  ngOnInit(): void { }

  logOutFunc() {
    this.util.removeCookie('authToken');
    this.util.removeToken();
    this.router.navigate(['/login']);
  }
}
