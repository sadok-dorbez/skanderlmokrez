import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  public message: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login(): void {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        if (res) {
          console.log("Logged succussfully!")
          this.storageService.saveUser(res);

          if (this.storageService.isAdminLoggedIn()) {
            this.router.navigateByUrl("/admin/dashboard");
          } else if (this.storageService.isCandidatLoggedIn()) {
            this.router.navigateByUrl("/candidat/dashboard");
          }
        } else {
          this.message = "Réponse vide";
        }
      },
      error => {
        console.log("Error in logging in!")
        this.message = error.message;
      }
    );
  }


}
