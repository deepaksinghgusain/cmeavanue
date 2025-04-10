import { Component } from '@angular/core';
import { FacultyComponent } from '../../../shared/faculty/faculty.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-instructor-listing',
  imports: [FacultyComponent, RouterModule],
  templateUrl: './instructor-listing.component.html',
  styleUrl: './instructor-listing.component.css'
})
export class InstructorListingComponent {

 

}
