import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RebirthEChartsModule} from 'rebirth-echarts';

@NgModule({
  imports: [
    CommonModule,
    RebirthEChartsModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {
}
