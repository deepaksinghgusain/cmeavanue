import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '#app-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent implements OnInit {
  @Input() faq: any;
  @Input() showTabContent: boolean = false;

  ngOnInit(): void {
      console.log(this.showTabContent);  
  } 
}
