import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from "../../../../auth/services/auth/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  signupForm!: FormGroup;
  message!: string;
  roles: any[] = [];

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });

    this.userService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  register(): void {
    if (this.signupForm.valid) {
      const user = {
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        roles: [this.signupForm.value.role]
      };

      this.authService.register(user).subscribe(
        (res) => {
          console.log(res);
          this.message = 'Inscription réussie !';
        },
        (error) => {
          console.error(error);
          this.message = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        }
      );
    }
  }
}
