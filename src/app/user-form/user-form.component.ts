import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { UserFormService } from '../services/user-form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, AfterViewInit {

  userForm: FormGroup;

  constructor(private form: FormBuilder, private http: HttpClient, private router: Router, private userformService: UserFormService) { 

    this.userForm = this.form.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[a-z0-9A-Z!@]*')]]
    })

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }

  login() {
    if(this.userForm.valid){
      this.userformService.userLogin().pipe(
        finalize( () => {
          this.router.navigate(['/beers']);
        }),
        catchError(error => {
          const errorMsg = error.status;
          return throwError(() => new Error(errorMsg));
        })
      ).subscribe();
    }
  }



}
