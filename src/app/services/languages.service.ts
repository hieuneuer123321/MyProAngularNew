import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
    currentDictionary = {}
    dictionaries = [
        {
            "Code":"VN",
            "data": {
                "login":{
                    "title": "Đăng Nhập",
                    "username": ""
                }
            }
        },
        {    
            "Code":"EN",
            "data": {

            }     
        }
    ]
  constructor() {
  }
  
}
