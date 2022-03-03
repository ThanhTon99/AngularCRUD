import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('content') content !: boolean;
  closeResult = '';
  title = 'AngularCRUD';
  todaydate = new Date()
  notifyData : any
  parentClick: Subject<void> = new Subject<void>()
  constructor(
      private modalService: NgbModal,
      private api: ApiService,
  ) { }
  
  ngOnInit(): void {
        this.api.getNotify().subscribe(res => {
        this.notifyData = res
      })
    }



}
