import { gridData } from './../../data/grid.data';
import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { GridComponent, InfiniteScrollSettingsModel } from '@syncfusion/ej2-angular-grids';
import { OpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';
import { DropDownButtonComponent, ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { Constants } from '@app/core/constants';
import { GridData } from '../../model/grid-data.model';
import { SupplierListService } from '../../service/supplier-list.service';
import { Vendor } from '../../model/vendor.model';
import { VendorTransformService } from '../../service/vendor-transform.service';

@Component({
  selector: 'vendor-supplier-list-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class VendorGridComponent implements OnInit {

  vendorData: Vendor[]=[];
  data = this.vendorData;
  infiniteOptions: InfiniteScrollSettingsModel = {
    enableCache: false,
    initialBlocks: 2,
  };

  selectOption = {
    type: 'Multiple',
    mode: 'Row',
    enableSimpleMultiRowSelection: true,
  };

  selectedRow = [];

  isInitial: true;

  @ViewChild('grid', { static: true })
  grid: GridComponent;

  @ViewChild('dropdownbutton') dropdownbutton: DropDownButtonComponent;

  group = false;
  currentActiveTool = 'search';
  toolbar = [];

  //We do not have specific type definition for this.
/* jshint ignore:start*/
@ViewChild('rightToolBarTemplate', { static: true })
rightToolBarTemplate;

@ViewChild('leftToolBarTemplate', { static: true })
leftToolBarTemplate;

initialSort = {
  columns: [{ field: 'uniqueSequenceId', direction: 'Descending' }],
};

items: ItemModel[] = [
  {
    id: Constants.ACTIONS.SEND,
    text: 'Send Invitation',
    iconCss: 'action-icon se-arrow-forward',
  }
];

isBulkSelect = false;
selectedRowsCount: number;
  constructor(private _supplierListService: SupplierListService, private _vendorTransformService: VendorTransformService) { }

  ngOnInit(): void {
    this._supplierListService.gridData$.subscribe(_data=>{
      this.vendorData = _data;
      console.log(this.vendorData);
     });
    this.setGridSettings();
  }

  setGridSettings(): void {
    this.grid.filterSettings.mode = 'Immediate';
    this.toolbar = [
      { template: this.leftToolBarTemplate },
      { template: this.rightToolBarTemplate, align: 'right' },
    ];
    this.infiniteOptions = { enableCache: false };
    this.grid.filterSettings.showFilterBarOperator = true;
  }

  /**
   * calls on intial load of grid
   */
   load(): void {
    this.isInitial = true;
  }

  /**
   * Adds the Search placeholer in search box of each column
   */
   dataBound(): void {
    // this.grid.autoFitColumns();
    if (this.isInitial) {
      const filterbar = this.grid.element.querySelector('.e-filterbar')
        .children;
      [].slice.call(filterbar).forEach((item) => {
        const field = item.querySelector('input.e-input').id.split('_')[0];
        item.querySelector('input.e-input').placeholder = 'Search';
      });
    }
  }

  /**
   * open column chooser
   */
  openColumnChooser(): void {
    this.grid.showColumnChooser = true;
    const gridWidth = document.getElementById('grid').clientWidth;
    let topPosition = 40;
    if (this.group) {
      topPosition = topPosition + 50;
    }
    this.grid.openColumnChooser(gridWidth - 310, topPosition);
  }

  /**
   * enables grouping of column
   */
  opengrouping(): void {
    this.group = !this.group;
    this.grid.allowGrouping = this.group;
    if (!this.grid.allowGrouping) {
      this.grid.clearGrouping();
    }
    if (this.group) {
      this.currentActiveTool = 'groupBy';
    } else {
      this.currentActiveTool = '';
    }
  }

  /**
   * export data in excel format
   */
  exportExcel(): void {
    this.grid.excelExport();
  }

  /**
   * export data in pdf format
   */
  exportPdf(): void {
    this.grid.pdfExport();
  }

  /**
   * Filter record on search input field as per column values entered
   *
   * @param event as Event
   * @returns {void}
   * @memberof PaymentGridComponent
  */
 search(event:Event): void {
  this.grid.search((event.target as HTMLInputElement).value);
}

  /**
   * to change the focus on search icon
   */
  focusSearch(): void {
    this.isBulkSelect = false;
    this.grid.allowSelection = false;
    this.currentActiveTool = 'search';
    setTimeout(() => {
      const element = document.getElementById('gridGlobalSearch');
      if (element) {
        element.focus();
      }
    }, 200);
  }

   /**
   * @description Method to enable bulk selection mode in grid
   * @returns void
   */
    bulkSelection(): void {
      this.isBulkSelect = !this.isBulkSelect;
      this.grid.allowSelection = this.isBulkSelect;

      if (this.isBulkSelect) {
        this.currentActiveTool = 'bulkActions';
      } else {
        this.currentActiveTool = '';
      }
    }

     /**
   * @description Method to reset toolbar
   * @returns void
   */
  resetSelectedTool(): void {
    this.grid.allowGrouping = false;
    this.isBulkSelect = false;
  }

  /**
   * To open popup in particular position.
   *
   * @param {OpenCloseMenuEventArgs} args
   * @memberof PaymentGridComponent
   */
   onOpen(args: OpenCloseMenuEventArgs): void {
    args.element.parentElement.style.left =
      this.dropdownbutton.element.getBoundingClientRect().left - 150 + 'px';
  }

  /**
   * @description Method to perform any customization on dropdown items before rendering
   * @param  {MenuEventArgs} args
   * @param  {PaymentMessage} data
   * @returns void
   */
   beforeItemRender(args: MenuEventArgs, data): void {

   }

   /**
   * @description Method gets called on click of actions and handles opening of confirmation popup based on action taken
   * @param  {} $event
   * @param  {PaymentMessage} data
   * @returns void
   */
  onActionClick($event, data): void {}



   /**
   * @description Method to select all rows
   * @returns void
   */
    selectAllRows(): void {
      this.grid.selectRowsByRange(0, this.data.length - 1);
    }

     /**
   * @description Method to clear selected rows
   * @returns void
   */
  clearRows(): void {
    this.grid.clearSelection();
  }

   /**
   * @description Method gets called on RowDeselect event of grid
   * @param  {} event
   * @returns void
   */
    onRowDeselect(event): void {
      this.selectedRow = this.selectedRow.filter(
        (d) => d.fileId !== event.data.fileId
      );
      this.selectedRowsCount = this.grid.getSelectedRecords().length;
    }

    /**
     * @description Method gets called on RowSelect event of grid
     * @param  {} event
     * @returns void
     */
    onRowSelect(event): void {
      this.selectedRowsCount = this.grid.getSelectedRecords().length;
    }

}
