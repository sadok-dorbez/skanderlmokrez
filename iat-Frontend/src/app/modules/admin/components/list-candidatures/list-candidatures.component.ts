import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-list-candidatures',
  templateUrl: './list-candidatures.component.html',
  styleUrls: ['./list-candidatures.component.css']
})
export class ListCandidaturesComponent implements OnInit{
  searchTerm: string = '';
  candidatures: any = [];

  constructor(private adminService: AdminService, private router : Router) { }

  ngOnInit(): void {
    this.getAllCandidatures()
  }

  getAllCandidatures(){
    this.adminService.getAllCandidatures().subscribe({
      next: (candidatures: any[]) => {
        this.candidatures = candidatures;
        console.log('Candidatures fetched successfully!')
      },
      error: (err: any) => {
        console.error('Error fetching candidatures:', err);
      }
    });
  }

  editCandidature(id: any) {

  }

  deleteCandidature(id: any): void {
    if (window.confirm('Are you sure you want to delete this candidature?')) {
      this.adminService.deleteCandidature(id).subscribe(
        () => {
          console.log(`Candidature with ID ${id} deleted successfully.`);
          this.getAllCandidatures();
        },
        (error: any) => {
          console.error(`Error deleting candidature with ID ${id}:`, error);
        }
      );
    }
  }

  downloadCv(id: any): void {
    this.adminService.downloadCv(id).subscribe((response: Blob) => {
      const blobUrl = URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'cv.pdf';
      a.click();
      URL.revokeObjectURL(blobUrl);
    }, (error: any) => {
      console.error('Error downloading CV:', error);
    });
  }
}

