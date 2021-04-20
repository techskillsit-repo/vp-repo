import { Component, OnInit, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, ChartComponent } from '@syncfusion/ej2-angular-charts';
@Component({
  selector: 'vendor-invitation-bar-horizontal',
  templateUrl: './bar-horizontal.component.html',
  styleUrls: ['./bar-horizontal.component.scss']
})
export class BarHorizontalComponent implements OnInit {

  @ViewChild("chart", { static: true }) chart: ChartComponent;
  public chartArea: Object = {
      border: {
          width: 0
      }
  };
  //Initializing Chart Width
  public data: Object[] =
      [
          {
              "x": "IM2160",
              "y": 32109
          },
          {
              "x": "IM2159",
              "y": 39456
          },
          {
              "x": "IM2158",
              "y": 41234
          },
          {
              "x": "IM2157",
              "y": 43000
          },
          {
              "x": "IM2156",
              "y": 44567
          },
          {
              "x": "IM2155",
              "y": 45680
          },
          {
              "x": "IM2154",
              "y": 50000
          }
      ]

  // public data: Object[] = [
  //     { x: 'IM2160', y: 32109 },
  //     { x: 'IM2159', y: 39456 },
  //     { x: 'IM2158', y: 41234 },
  //     { x: 'IM2157', y: 43000 },
  //     { x: 'IM2156', y: 44567 },
  //     { x: 'IM2155', y: 45680 },
  //     { x: 'IM2154', y: 50000 },

  // ];

  //Initializing Marker
  public marker: Object = {
      dataLabel: {
          visible: true,
          position: 'Top',
          font: {
              fontWeight: '600', color: '#ffffff'
          }
      }
  }
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
      valueType: 'Category',
      interval: 1,
      majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
      labelFormat: '{value}',
      edgeLabelPlacement: 'Shift',
      majorGridLines: { width: 0 },
      majorTickLines: { width: 0 },
      lineStyle: { width: 0 },
      labelStyle: {
          color: 'transparent'
      }
  };
  public tooltip: Object = {
      enable: true
  };
  // custom code start
  public load(args: ILoadedEventArgs): void {
      let selectedTheme: string = location.hash.split('/')[1];
      selectedTheme = selectedTheme ? selectedTheme : 'material';
      args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };
  // custom code end
  public title: string = '7 Highest Amount';

  constructor() { }

  ngOnInit(): void {
      this.chart.height = "60%";
      this.chart.width = "100%";
      this.chart.legendSettings.visible = false;

  }
}
