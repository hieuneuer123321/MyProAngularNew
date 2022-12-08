import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private generalService: GeneralService) { }

  ngOnInit(): void {
    if (!this.generalService.isLogin)
      this.router.navigate(['/login'])
    else {
      this.router.navigate(['/dashboard'])
    }
  }

   

}
