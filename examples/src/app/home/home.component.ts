import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '(window:mooa.bootstrapping)': 'loadingStart($event)',
    '(window:mooa.mounting)': 'loadingEnd($event)'
  }
})
export class HomeComponent {
  @ViewChild('child') childElement: ElementRef;

  loadingStart() {
    this.childElement.nativeElement.innerHTML = `
<div class="loading">
  <p>loading</p>
  <div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</div>`;
  }

  loadingEnd() {
    const loadingSelector = this.childElement.nativeElement.querySelector('.loading');
    if (loadingSelector) {
      loadingSelector.style.display = 'none';
    }
  }

}
