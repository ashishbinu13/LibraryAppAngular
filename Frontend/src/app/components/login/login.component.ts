import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}
  ngOnInit(): void {}

  fabook = faBook;
  isInvalid: boolean = false;
  errorMessage: string = '';

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        this.isInvalid = false;
        const { accessToken, refreshToken } = JSON.parse(JSON.stringify(data));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        this.router.navigate(['home']);
      },
      (response) => {
        this.errorMessage = response.error.message;
        this.isInvalid = true;
      }
    );
  }
}
