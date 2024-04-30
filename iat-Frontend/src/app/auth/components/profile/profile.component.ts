import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../modules/admin/services/user.service";
import {StorageService} from "../../services/storage/storage.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private storageService:StorageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const userId = this.storageService.getUser().id;
    this.getUser(userId);
  }

  getUser(id: number): void {
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
    });
  }

  getImageUrl(imageName: string): SafeResourceUrl {
    const url = `http://localhost:8080/api/user/loadImage/${imageName}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
