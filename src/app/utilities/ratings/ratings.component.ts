import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private generalService: GeneralService, private api: ApiservicesService) { }
  @Input() ratings: number = 0
  @Input() enable: boolean = false
  @Input() userId: string = ""
  @Input() type: string = "USER"
  mscv: string = ""
  rateNumber: number = 0
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.mscv = params['taskid']
    });
    this.rateNumber = this.ratings
  }
  ngOnChange(changes: SimpleChange): void {

  }
  async rate() {
    this.ratings = this.rateNumber
    if (this.type == 'TASK') {
      const model = {
        mscv: this.mscv,
        rating: this.rateNumber
      }
      const res = await this.api.httpCall(this.api.apiLists.TaskRating, {}, model, 'post', true)
      this.showMessage(res);
      return;
    }
    const model = {
      mscv: this.mscv,
      userId: this.userId,
      rating: this.rateNumber
    }
    const res = await this.api.httpCall(this.api.apiLists.RatingParticipantFromTask, {}, model, 'post', true);
    this.showMessage(res);
  }
  showMessage(res: any) {
    res.validationMessages.forEach(x => {
      this.generalService.showErrorToast(res.IsValid ? 0 : 1, x);
    });
  }
}
