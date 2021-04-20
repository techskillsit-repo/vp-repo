 import { Component, OnInit, ViewChild } from '@angular/core';
 import { AccumulationChartComponent } from '@syncfusion/ej2-angular-charts';
@Component({
  selector: 'vendor-invitation-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit {

  @ViewChild("accumulationChart", { static: true }) accumulationChart: AccumulationChartComponent;

  public data: any[];
  public chartLabel: Object;
  public legend: Object;
  public dataLabel: Object;
  public tooltipSettings: Object;


  constructor() { }

  ngOnInit(): void {
    this.data = [
      {
        "index": 0,
        "name": "Approved",
        "value": "34",
        "text": "34",
        "status": "100"
      },
      {
        "index": 1,
        "name": "Rejected",
        "value": "18",
        "text": "18",
        "status": "200"
      },
      {
        "index": 2,
        "name": "Sent",
        "value": "145",
        "text": "145",
        "status": "300"
      },
      {
        "index": 3,
        "name": "Import Successful",
        "value": "169",
        "text": "169",
        "status": "400"
      },
      {
        "index": 4,
        "name": "New",
        "value": "17",
        "text": "17",
        "status": "600"
      }
    ];

    this.legend = {
      visible: true

    }

    this.dataLabel = {
      visible: true, position: 'Inside', connectorStyle: { type: 'Curve', length: '5%' }, font: { size: '14px', color: 'white' }
    };

    this.tooltipSettings = {
      enable: true,
      format: '${point.x}:<b>${point.y}</b>'
    }

     // this.accumulationChart.title='257 Payment Files';
     this.accumulationChart.width = '100%';
     this.accumulationChart.height = '60%';
     this.accumulationChart.highLightMode = 'Point';
     this.accumulationChart.selectionMode = 'Point';
     this.accumulationChart.margin.left = 0;
     this.accumulationChart.isMultiSelect = false;
     this.accumulationChart.title = 'Vendor Invites';
     // this.accumulationChart.selectionPattern='Chessboard';
     // this.accumulationChart.subTitle='257 Payment Files';

     // //change the theme as per UX req.
     this.accumulationChart.theme = 'Fabric';
     this.accumulationChart.legendSettings.textStyle.size = '12px';
     this.accumulationChart.margin.left = 0;
     this.accumulationChart.margin.top = 0;
     this.accumulationChart.margin.right = 0;
     this.accumulationChart.legendSettings.position = 'Right';

     // //tooltip customization as per UX Req.
     // this.accumulationChart.tooltip.textStyle.size = '14px';

     //this click is useful for calling API

     this.accumulationChart.pointClick.subscribe(
       data => {
         console.log(this.data.filter(e => e.index === data.pointIndex));
       }
     );
     //this effects the label position //Near, Center,Far
     // this.accumulationChart.legendSettings.alignment = "Near";
   }


}
