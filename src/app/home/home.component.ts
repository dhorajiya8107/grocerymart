import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  highlightercolor = 'black';
  currentYear: number;

facebook(url) {
  // window.location = "https://www.facebook.com";
  window.open(url, '_blank', 'noopener,noreferrer');
}

  username:any;

  constructor(public authService: AuthService, public router:Router){
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(){

    this.authService.getAllRoles().subscribe((res) => {})

    const user = JSON.parse(localStorage.getItem('user'));
    this.username = user.Username;
    
  }
  
  Shopnow(){
    this.router.navigate(['/products']);
  }
  

}
