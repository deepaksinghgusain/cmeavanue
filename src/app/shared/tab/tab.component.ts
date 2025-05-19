import { Component, Input } from '@angular/core';

@Component({
  selector: '#app-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  @Input() faq: any;
  @Input() showTabContent: boolean = false;
}
