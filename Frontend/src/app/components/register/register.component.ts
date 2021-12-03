import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}
  isInvalid: boolean = false;
  fabook = faBook;
  errorMessage: string = '';

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  submit(): void {
    this.authService.register(this.registerForm.value).subscribe(
      (data) => {
        this.isInvalid = false;
        const { accessToken, refreshToken } = JSON.parse(JSON.stringify(data));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        this.router.navigate(['login']);
      },
      (response) => {
        this.errorMessage = response.error.message;
        this.isInvalid = true;
      }
    );
  }

  ngOnInit(): void {}
}
