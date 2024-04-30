import { Component } from '@angular/core';
import {StorageService} from "./auth/services/storage/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projetpfe';

  constructor(private storageService: StorageService) {
  }
  logout(){
    return this.storageService.clean();
  }
}
