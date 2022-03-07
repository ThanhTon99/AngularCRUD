
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { NotifyModel } from '../notify';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public notifyModel!: NotifyModel;

  @ViewChild('content') content: any;
  notifyData: any;
  closeResult = '';
  todaydate = new Date();
  parentClick: Subject<void> = new Subject<void>()
  notify !: NotifyModel
  constructor(

    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private api: ApiService,

  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      accout: [''],
      password: [''],
      login: ['truoc'],
    })
    this.api.getNotify().subscribe(res => {
      this.notifyData = res;
    })
    this.http.get<any>("http://localhost:3000/posts").subscribe(res => {
      const time = res.find((a: any) => {
        return a.login === this.loginForm.value.login
      })
      if (time) {
        this.open(this.content)
      } else {
        this.getAllNotify
      }
    })
  }
  onParentButtonClick() {
    this.parentClick.next()
  }
  add(events: NotifyModel, id : any){
    debugger
    this.api.updateNotify(events, id)
  }
  login() {
    this.http.get<any>("http://localhost:3000/signupUsers")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.accout === this.loginForm.value.accout && a.password === this.loginForm.value.password
        })
        if (user) {
          this.loginForm.reset()
          this.router.navigate(['dashboard'])
          this.http.get<any>("http://localhost:3000/posts").subscribe(res => {
            const time = res.find((a: any) => {
              return a.login == ['truoc']
            })
            if (time) {
              this.getAllNotify
            } else {
              this.open(this.content)
            }
          })
        } else {
          alert("Username or password is incorrect")
        }
      }, err => {
        alert("Something Wrong !!!")
      })

  }

  getAllNotify() {
    this.api.getNotify().subscribe(res => {
      this.notifyData = res;
    }
    )
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
}
