import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{
  content?: string;
  users: any[] = [];
  searchTerm: string = '';
  roles: any[] = [];
  roleFilter: string = '';
  constructor(private userService: UserService, private router : Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllUsers()
    this.getRoles()
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users: any[]) => {
        this.users = users;
        console.log('Users fetched successfully!')
      },
      error: (err: any) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  getRoles() {
    this.userService.getRoles().subscribe(
      res => {
        this.roles = res;
        console.log('Roles fetched successfully!')
      },
      error => {
        console.error('Error fetching roles:', error);
      }
    );
  }


  filterUsers(): any[] {
    return this.users.filter(user => {
      const usernameMatches = !this.searchTerm || user.username.toLowerCase().includes(this.searchTerm.toLowerCase());
      const roleMatches = !this.roleFilter || user.roles.some((role: { name: string; }) => role.name === this.roleFilter);
      return usernameMatches && roleMatches;
    });
  }

  editUser(id: any) {
    this.router.navigate(['/edituser/'+ id]);
  }

  deleteUser(id: any): void {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          console.log(`User with ID ${id} deleted successfully.`);
          this.getAllUsers();
        },
        (error: any) => {
          console.error(`Error deleting user with ID ${id}:`, error);
          this.getAllUsers();
        }
      );
    }
  }

}



