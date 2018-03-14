import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RebirthEChartsModule} from 'rebirth-echarts';
import {HomeComponent} from '../home/home.component';
import {GraphComponent} from './graph.component';

@NgModule({
  imports: [
    CommonModule,
    RebirthEChartsModule
  ],
  declarations: [GraphComponent],
  exports: [GraphComponent]
})
export class GraphModule { }
