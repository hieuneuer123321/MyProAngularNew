import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-new-customers',
  templateUrl: './new-customers.component.html',
  styleUrls: ['./new-customers.component.css']
})
export class NewCustomersComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  countryData
  districtsData
  provincescode = "thanh_pho_ha_noi"
  ngOnInit(): void {
    this.gData();
  }
  async gData() {
    this.httpClient.get('https://provinces.open-api.vn/api/?depth=2').subscribe(i => {
      this.countryData = i;
      this.setProvincesCode(this.provincescode)
    })
  }
  setProvincesCode(e) {
    this.countryData?.forEach(element => {
      if (element.codename === e) {
        this.districtsData = element.districts
      }
    });
  }
}
