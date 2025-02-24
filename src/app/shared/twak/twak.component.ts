import { Component, Renderer2 } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-twak',
  imports: [],
  templateUrl: './twak.component.html',
  styleUrl: './twak.component.css'
})
export class TwakComponent {
  constructor(@Inject(DOCUMENT) private document: Document,private renderer: Renderer2) {}

  ngOnInit() {
    const script = `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/660499fea0c6737bd1259c77/1hq0vj353';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();`;
    const el = this.renderer.createElement('script');
    el.text = script;
    this.renderer.appendChild(this.document.body, el);
  }
}
