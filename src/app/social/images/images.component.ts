import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import data from './images.language';

declare var bootstrap: any
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  constructor(private el: ElementRef, public generalService: GeneralService) { }
  myModal
  editable = false;
  imageGroupTitle = ["Nhóm 1", "Nhóm 2", 'Nhóm 3']

  imagesData = []
  spinnerLoading = false;
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;
  config
  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(document.querySelector('#img-modal'), {
    })
    this.gData()
  }
  lookup() {
    this.editable = false;
    this.myModal.show();
  }
  save() {
    this.myModal.hide();
  }
  edit() {
    this.editable = true;
  }
  cancel() {
    this.editable = false;
  }
  uploadFile() {
    document.getElementById("uploadimages").click();
  }
  gData() {
    this.imagesData = []
    for (let i = 0; i <= this.count; i++) {
      let randomDate = () => {
        let start = new Date(2012, 0, 1);
        let end = new Date();
        let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date;
      }
      let randomText = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
        }
        return result;
      }
      let randomPhone = (length) => {
        var result = '0';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
        }
        return result;
      }
      let d = {
        title: randomText(20),
        img: `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/300/300`,
      }
      this.imagesData.push(d);
    }
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.imagesData.length
    }
  }
  handlePageChange(event): void {
    this.page = event;
    this.gData();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData();
  }
}
