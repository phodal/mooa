import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import Mooa, {mooaRouter} from 'mooa';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('child') childElement: ElementRef;
}
