import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  username:any;

  constructor(public authService: AuthService){}

  ngOnInit(){

    this.authService.getAllRoles().subscribe((res) => {})

    const user = JSON.parse(localStorage.getItem('user'));
    this.username = user.Username;
    
  }

}
