import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

  showhowdetails = false;
  showhidedetails = false;
  showshowdetails = false;
  currentYear: number;

facebook(url) {
  // window.location = "https://www.facebook.com";
  window.open(url, '_blank', 'noopener,noreferrer');
}

constructor(){
  this.currentYear = new Date().getFullYear();
}

  what() {
    this.showshowdetails = true;
    this.showhowdetails = false;
    this.showhidedetails = false;
    }
    
  why() {
      this.showshowdetails = false;
      this.showhowdetails = false;
      this.showhidedetails = true;
      }

  how() {
    this.showshowdetails = false;
    this.showhowdetails = true;
    this.showhidedetails = false;
        }


  hidedetails() {
    //   this.showhidedetails = true;
      this.showshowdetails = false;
    //   var text = document.getElementById("hidedetails");
    //   text.style.display = "block";
    }
    showdetails() {
      // this.showhidedetails = false;
      this.showshowdetails = true;
      // var text = document.getElementById("showdetails");
      // text.style.display = "block";
      
    }

}
