import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin.service";
import {TestService} from "../../services/test.service";

@Component({
  selector: 'app-list-sujets',
  templateUrl: './list-sujets.component.html',
  styleUrls: ['./list-sujets.component.css']
})
export class ListSujetsComponent implements OnInit{
  searchTerm: string = '';
  sujets: any = [];
 
  selectedSujetId: any;
  newSujet: any = {};
  editingSujet: any = null;
  newTest: any = {};
  constructor(private adminService: AdminService, private router : Router, private testService: TestService) { }

  ngOnInit(): void {
    this.getAllSujets()
  }

  getAllSujets(){
    this.adminService.getAllSujets().subscribe({
      next: (sujets: any[]) => {
        this.sujets = sujets;
        console.log('Sujets fetched successfully!')
      },
      error: (err: any) => {
        console.error('Error fetching sujets:', err);
      }
    });
  }

  editSujet(id: any) {

  }

  deleteSujet(id: any): void {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteSujet(id).subscribe(
        () => {
          console.log(`Sujet with ID ${id} deleted successfully.`);
          this.getAllSujets();
        },
        (error: any) => {
          console.error(`Error deleting sujet with ID ${id}:`, error);
        }
      );
    }
  }
  saveTest(): void {
    this.testService.addTestToSujet(this.newTest, this.selectedSujetId).subscribe(
      savedTest => {
        console.log('Test saved successfully:', savedTest);
        this.closeTestDialog();
      },
      error => {
        console.error('Error saving test:', error);
      }
    );
  }

  openAddTestDialog(sujetId: any): void {
    this.selectedSujetId = sujetId;
    this.newTest = {};
    this.openTestDialog();
  }

  closeTestDialog(): void {
    const testDialog = document.getElementById('testDialog');
    if (testDialog) {
      testDialog.style.display = 'none';
    }
  }
  addTest(sujetId: any) {
    this.router.navigate(['/admin/add-test', sujetId]);
  }

  openTestDialog(): void {
    const testDialog = document.getElementById('testDialog');
    if (testDialog) {
      testDialog.style.display = 'block';
    }
  }


}
