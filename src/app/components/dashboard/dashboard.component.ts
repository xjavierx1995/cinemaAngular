import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var urls = [
      "../../../assets/images/bg.jpg",
      "../../../assets/images/bg2.jpeg",
      "../../../assets/images/bg3.jpeg",
      "../../../assets/images/bg4.jpeg",
      "../../../assets/images/bg5.jpeg",
      ];
    let site = document.getElementById('site')
    var count = 1;
    site.style.background = 'url("' + urls[0] + '")'
    setInterval(function() {
      site.style.background = 'url("' + urls[count] + '")'
      count === urls.length - 1 ? (count = 0) : count++;
    }, 10000);

  }

}
