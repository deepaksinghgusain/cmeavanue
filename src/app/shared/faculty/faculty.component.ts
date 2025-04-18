import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { InstructorService } from '../../services/instructor.service';
import { SubSink } from 'subsink';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-faculty',
  imports: [RouterModule],
templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css'
})
export class FacultyComponent implements OnInit {
  environmentUrl: string = environment.apibaseurl;
  facultymembers: any = [];
  public unsubscribe$ = new SubSink()
  visiblePopup: boolean = false;
  showCurrentFacultyDataPopup:any;

  closePopup() {
    this.visiblePopup = false;
  }

  showPopup(id: number) {
   
    let result = this.facultymembers.find((value:any) => value.id === id);

    if(result) {
      this.showCurrentFacultyDataPopup = result;
    }
    
    this.visiblePopup = true;
  }

  constructor( private _instructorService: InstructorService,  public sanitizer: DomSanitizer){}


  ngOnInit(): void {
    this.facutltyByGql();
  }

  sanitize(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content)  
  }

  facutltyByGql() {
    this.unsubscribe$.add(this._instructorService.getInstructorsForHome().subscribe((res: any) => {
      
      if (res) {
        this.facultymembers = res.data.instructors.data  
      }
    }))
  }
}
