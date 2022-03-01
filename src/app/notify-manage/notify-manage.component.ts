import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-notify-manage',
  templateUrl: './notify-manage.component.html',
  styleUrls: ['./notify-manage.component.css']
})
export class NotifyManageComponent implements OnInit {

  clickCount = [''];
  
  todaydate = new Date()
  notifyData = this.api.getNotify()
  @Input() parentClick?: Subject<void>
  constructor(
    private api: ApiService
  ) { }

  ngOnInit():void {
    this.parentClick?.subscribe(() => this.incrementValue())
  }

  incrementValue(){
    return this.clickCount = [this.todaydate + ' ĐÃ XEM'] 
  }
}
