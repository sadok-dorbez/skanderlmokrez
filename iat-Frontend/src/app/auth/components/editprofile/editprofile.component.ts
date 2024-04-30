import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../../modules/admin/services/user.service";
import {StorageService} from "../../services/storage/storage.service";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  user!: any;
  userId!: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.userId = this.storageService.getUser().id;
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user;
      console.log("Profile fetched successfully!")
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.userId, this.user).subscribe(
      response => {
        console.log("Profile updated successfully!")
        this.router.navigate(['profile']);
      },
      error => {
        console.log("Error in updating profile!")
        this.router.navigate(['profile']);
      }
    );
  }

}
