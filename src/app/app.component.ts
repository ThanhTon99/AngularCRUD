import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(
      private modalService: NgbModal,
      private api: ApiService,
  ) { }
  
  ngOnInit(): void {

        this.api.getNotify().subscribe(res => {
        this.notifyData = res
        //this.open(this.content)
      })
    }
  
  // open(content: any) {
  //   this.modalService.open(content,
  //     { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     }, (reason) => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     })
  // }
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

}
