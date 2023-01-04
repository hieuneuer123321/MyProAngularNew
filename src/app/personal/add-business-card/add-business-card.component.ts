import { Component, OnInit } from '@angular/core';
import data from './add-business-card.language';
import { GeneralService } from 'src/app/services/general.service';
import { WizardComponent } from 'angular-archwizard';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-add-business-card',
  templateUrl: './add-business-card.component.html',
  styleUrls: ['./add-business-card.component.css'],
})
export class AddBusinessCardComponent implements OnInit {
  state = {
    name: '',
    sdt: '',
    email: '',
    ghichu: '',
  };
  submitted = false;
  error: {};
  // addForm: FormGroup;
  constructor(
    public generalService: GeneralService,
    private formBuilder: FormBuilder
  ) {}
  addForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    ghichu: [''],
    sdt: [
      '',
      [
        Validators.pattern('[- +()0-9]+'),
        Validators.minLength(6),
        Validators.maxLength(10),
      ],
    ],
    email: ['', [Validators.email]],
  });
  get a() {
    return this.addForm.controls;
  }
  ngOnInit(): void {
    // this.addForm = this.formBuilder.group({
    //   name: ['', [Validators.required]],
    //   phone: [
    //     '',
    //     [
    //       Validators.pattern('[- +()0-9]+'),
    //       Validators.minLength(6),
    //       Validators.maxLength(10),
    //     ],
    //   ],
    //   email: ['', [Validators.email]],
    // });
  }
  get f() {
    return this.addForm.controls;
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`];
  }
  addBusiness() {
    this.submitted = true;
    const obj = {
      name: this.state.name,
      sdt: this.state.sdt,
      email: this.state.email,
      ghichu: this.state.ghichu,
    };
    // console.log(obj);
    if (this.addForm.valid) {
      console.log(this.addForm.value);
    } else {
      console.log('lỗi');
    }
  }
}
