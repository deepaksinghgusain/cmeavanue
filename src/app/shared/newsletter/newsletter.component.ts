import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { SubSink } from 'subsink';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-newsletter',
  imports: [ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
  subscription: any;
  public unsubscribe$ = new SubSink()

  form = new FormGroup({
    email: new FormControl(null, Validators.required)
  })

  constructor(private _commonService: CommonService, private newsletter: NewsletterService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.gethomePageSection();
   
  }

  gethomePageSection() {
    this.unsubscribe$.add(this._commonService.getHomePageSection().subscribe((res: any) => {
      if (res) {
        this.subscription = res?.data?.attributes?.blocks.filter((x: { __component: string; }) => x.__component === 'blocks.subscription')[0];
      }
    }));
  }

  onSubmit() {
    this.newsletter.addNewsletter(this.form.value).subscribe({
      next: (data) => {
        this.toastr.success("Thank you for subscribing with us");
        this.form.reset();
      },
      error: () => {
        this.toastr.error("Something went wrong");
      }
    })
    
  }

  showConfirm() {

  }

  onReject() {

  }

}
