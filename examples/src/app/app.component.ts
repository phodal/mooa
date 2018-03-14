import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import Mooa, {mooaRouter} from 'mooa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
