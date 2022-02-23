
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  @ViewChild('content') content !: boolean;
  notifyData: any
  closeResult = '';

  constructor(
    private formBuider: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private api: ApiService,

  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuider.group({
      accout: [''],
      password: ['']
    })
    if (this.content = false) {
      this.api.getNotify().subscribe(res => {
        this.notifyData = res
        this.open(this.content)
      })
    }
  }

  clicklogin() {
    this.api.getNotify().subscribe(res => {
      this.notifyData = res
      this.open(this.content)
    })
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
        } else {
          alert("Username or password is incorrect")
        }
      }, err => {
        alert("Something Wrong !!!")
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

}
