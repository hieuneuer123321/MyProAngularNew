import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { title } from 'process';
import { Y } from 'angular-mydatepicker';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keylabel
  searchdata=[]
  apiUrl=['https://62fde3c541165d66bfb3a622.mockapi.io/api/projectlist','https://62fde3c541165d66bfb3a622.mockapi.io/api/project']
  result=[]
  constructor(private router: Router, private activaterouter: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.activaterouter.params.subscribe(e => {
      this.keylabel = e['label']
    })
    this.getData()
  }

  async getData() {
    this.apiUrl.forEach((x,index)=>{
      this.httpClient.get(x).subscribe(i => {
        this.searchdata[index]=i
        this.search(this.keylabel,index)
        console.log(this.result)
      })
    })
 
  }
  search(label,index) {
    this.result[index]=[]
    this.searchdata[index].forEach(element => {
      if(element.name.search(label)>-1){
        console.log(element.name.search(label))
        this.result[index].push(element)
      }
    });
  }
  
}
