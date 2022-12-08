import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.css']
})
export class CreateFolderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.duLieuSo()
  }
create_foldersoMoi=[]
create_folder_new
duLieuSo(){
  for (let i = 0; i < 10; i++) {
    this.create_foldersoMoi.push(i+1)
  }

}
tuyDung()
{
this.create_folder_new=true;
}
}
