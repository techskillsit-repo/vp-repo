import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncfusionModules } from '@app/shared/syncfusion.module';

import { SupplierInvitationListRoutingModule } from './supplier-invitation-list-routing.module';
import { SupplierInvitationListComponent } from './supplier-invitation-list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VendorGridComponent } from './components/grid/vendor-grid.component';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { SharedModule } from '@app/shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { HttpClientModule } from '@angular/common/http';
import { DonutComponent } from './components/visualization/donut/donut.component';
import { BarHorizontalComponent } from './components/visualization/bar-horizontal/bar-horizontal.component';
import { BarVerticalComponent } from './components/visualization/bar-vertical/bar-vertical.component';
import { LineComponent } from './components/visualization/line/line.component';
import {  StackingColumnSeriesService, StackingBarSeriesService, BarSeriesService, ColumnSeriesService, PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService, AccumulationAnnotationService, CategoryService, TooltipService, LegendService, DataLabelService, LineSeriesService, AccumulationChartModule, ChartModule } from '@syncfusion/ej2-angular-charts';
import { ChartsComponent } from './components/charts/charts.component';

@NgModule({
  declarations: [SupplierInvitationListComponent, ToolbarComponent, VendorGridComponent, FilterComponent, DonutComponent, BarHorizontalComponent, BarVerticalComponent, LineComponent, ChartsComponent],
  imports: [
    CommonModule,
    SupplierInvitationListRoutingModule,TabModule,SyncfusionModules,SharedModule,QueryBuilderModule,
    HttpClientModule,
    AccumulationChartModule,
    ChartModule
  ],
  providers: [PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService,
    AccumulationAnnotationService, CategoryService,  LegendService, TooltipService, CategoryService,DataLabelService, LineSeriesService,
    StackingColumnSeriesService,
     BarSeriesService ]
})
export class SupplierInvitationListModule { }
