import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  register(){
    console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe(
      (res) => {
        console.log(res);
        this.message = 'Inscription réussie !';
        this.router.navigate(['login']);

      },
      (error) => {
        console.error(error);
        this.message = 'Erreur lors de l\'inscription. Veuillez réessayer.';
      }
    );
  }
}
