import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { elementAt } from 'rxjs';
import { ApiService } from '../api.service';
import { NotifyModel } from '../notify';
@Component({
  selector: 'app-notify-dashboard',
  templateUrl: './notify-dashboard.component.html',
  styleUrls: ['./notify-dashboard.component.css']
})
export class NotifyDashboardComponent implements OnInit {

  urls: string[] = [];
  @ViewChild('content') content !: boolean;
  formValue !: FormGroup
  notifyModelObj: NotifyModel = new NotifyModel()
  notifyData: any
  showAdd !: boolean
  showUpdate!: boolean
  closeResult = ''
  countries = ['Trước Đăng Nhập', 'Sau Đăng Nhập']
  todaydate = new Date()

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title: [''],
      description: [''],
      content: [''],
      start: [''],
      end: [''],
      login: [''],
      display: [''],
      file: [],
    })

    this.api.getNotify().subscribe(res => {
      this.notifyData = res
      //this.open(this.content)
    })
  }

  open(content: any) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      })
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  clickAddNotify() {
    this.formValue.reset()
    this.showAdd = true
    this.showUpdate = false
  }

  postNotifyDatails() {
    this.notifyModelObj.title = this.formValue.value.title
    this.notifyModelObj.description = this.formValue.value.description
    this.notifyModelObj.content = this.formValue.value.content
    this.notifyModelObj.start = this.formValue.value.start
    this.notifyModelObj.end = this.formValue.value.end
    this.notifyModelObj.login = this.formValue.value.login
    this.notifyModelObj.display = this.formValue.value.display
    this.notifyModelObj.file = this.formValue.value.file

    this.api.postNotify(this.notifyModelObj).subscribe(res => {
      console.log(res);
      alert("Notify Addded Successfully")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllNotify()
    }, err => {
      alert("Something Wrong")
    })
  }

  getAllNotify() {
    this.api.getNotify().subscribe(res => {
      this.notifyData = res
    })
  }
  deleteNotify(row: any) {
    this.api.deleteNotify(row.id).subscribe(res => {
      alert("Notify Deleted")
      this.getAllNotify()
    })
  }
  onEdit(row: any) {
    this.showAdd = false
    this.showUpdate = true
    this.notifyModelObj.id = row.id
    this.formValue.controls['title'].setValue(row.title)
    this.formValue.controls['description'].setValue(row.description)
    this.formValue.controls['content'].setValue(row.content)
    this.formValue.controls['start'].setValue(row.start)
    this.formValue.controls['end'].setValue(row.end)
    this.formValue.controls['login'].setValue(row.login)
    this.formValue.controls['display'].setValue(row.display)
    this.formValue.controls['file'].setValue(row.file)
  }
  updateNotifyDatails() {
    this.notifyModelObj.title = this.formValue.value.title
    this.notifyModelObj.description = this.formValue.value.description
    this.notifyModelObj.content = this.formValue.value.content
    this.notifyModelObj.start = this.formValue.value.start
    this.notifyModelObj.end = this.formValue.value.end
    this.notifyModelObj.login = this.formValue.value.login
    this.notifyModelObj.display = this.formValue.value.display
    this.notifyModelObj.file = this.formValue.value.file

    this.api.updateNotify(this.notifyModelObj, this.notifyModelObj.id)
      .subscribe(res => {
        alert("Update Seccessfully")
        let ref = document.getElementById('cancel')
        ref?.click()
        this.formValue.reset()
        this.getAllNotify()
      })
  }
  onselectImage(e: any) {
    if (e.target.files) {
      for (let i = 0; i < File.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = (events: any) => {
          this.urls.push(events.target.result)
        }
      }
    }
  }
}
