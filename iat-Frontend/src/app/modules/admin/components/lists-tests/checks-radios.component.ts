import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Test } from 'src/app/modules/models/testModel';
import { TestService } from 'src/app/modules/admin/services/test.service';

@Component({
  selector: 'app-checks-radios',
  templateUrl: './checks-radios.component.html',
  styleUrls: ['./checks-radios.component.scss']
})
export class ChecksRadiosComponent {

  tests: Test[]  = [];
  editingTest: any = null;
  newTest: any = {};

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.getTestsList();
  }

  getTestsList() {
    this.testService.getAllTest().subscribe(
      data => {
        this.tests = data;
        console.log(this.tests)
      },
      error => {
        console.error("Error fetching tests:", error);
      }
    );
  }

  openEditTestDialog(testId: number): void {
    this.editingTest = this.tests.find(test => test.id === testId);
    this.newTest = { ...this.editingTest }; 
    this.openTestDialog();
  }

  closeTestDialog(): void {
    const testDialog = document.getElementById('testDialog');
    if (testDialog) {
      testDialog.style.display = 'none';
    }
  }

  openTestDialog(): void {
    const testDialog = document.getElementById('testDialog');
    if (testDialog) {
      testDialog.style.display = 'block';
    }
  }

  editTest(): void {
    this.testService.updateTest(this.editingTest.id, this.newTest).subscribe(
      updatedTest => {
        console.log('Test updated successfully:', updatedTest);
        this.getTestsList();
        this.closeTestDialog();
      },
      error => {
        console.error('Error updating test:', error);
      }
    );
  }

  deleteTest(testId: number): void {
    if (confirm('Are you sure you want to delete this test?')) {
      this.testService.deleteTest(testId).subscribe(
        () => {
          console.log('Test deleted successfully.');
          this.getTestsList();
        },
        error => {
          console.error('Error deleting test:', error);
        }
      );
    }
  }

  navigateToQuestionForm(testId: number): void {
    this.testService.navigateToQuestionForm(testId);
 }

}
