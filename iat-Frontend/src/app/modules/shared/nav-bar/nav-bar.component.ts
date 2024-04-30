import { Component } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navBar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  title = "frontend-app"
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor( private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      //         //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //         //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.storageService.clean();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);

  }
}
