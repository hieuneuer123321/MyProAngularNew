import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    //this.router.navigate(['/social/notification']);
  }
}
