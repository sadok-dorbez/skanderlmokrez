import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  user = {
    id: null,
    username: '',
    email: '',
    creationDate: '',
    token: null,
    tokenCreationDate: null,
    activated: false,
    numtele: null,
    country: '',
    roles: {}
  };
  userId!: any;
  roles: any[] = [];
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(user => {
        this.user = user;
      });
    }
    this.userService.getRoles().subscribe(roles => {
      this.roles = roles;
      console.log("Roles fetched successfully!")
    });
  }

  getUser(id: number): void {
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
      console.log("User fetched successfully!")
    });
  }


  updateUser(): void {
    this.userService.updateUser(this.userId, this.user).subscribe(
      response => {
        console.log("User updated successfully!")
      },
      error => {
        console.log("User updated successfully!")
      }
    );
    this.router.navigate(['/admin/users']);
  }


}
