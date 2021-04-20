/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { QueryBuilderComponent, RuleModel, ShowButtonsModel } from '@syncfusion/ej2-angular-querybuilder';
import { PositionDataModel } from '@syncfusion/ej2-popups';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { SupplierListService } from '../../service/supplier-list.service';

@Component({
  selector: 'vendor-supplier-list-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  showButtons: ShowButtonsModel = {
    groupInsert: false,
    groupDelete: false,
    ruleDelete: true,
  };

  companyCodeOperators =[{
    'key' : 'Equal',
    'value' : 'equals'
  },{
    'key' : 'Between',
    'value' : 'between'
  },{
    'key' : 'In',
    'value' : 'in'
  }
  ];

  logicalSystemOperators = [
    {
      'key' : 'In',
      'value' : 'in'
    }
  ];


  i: boolean;

  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef }) container: ElementRef;

  targetElement: HTMLElement;
  target = '.control-section';

  // @Input('dialogPosition') dialogPosition : PositionDataModel = { X: 'right', Y: 'top' };

  dialogPosition: PositionDataModel = { X: 'right', Y: 'top' };

  @Input()
  dialogVisible: boolean;
  @Input()
  importRules : RuleModel;
  initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  };

  @ViewChild('ejDialog', { static: true }) ejDialog: DialogComponent;
  @ViewChild('querybuilder', { static: false }) qryBldrObj: QueryBuilderComponent;

  @Output('dialogClosed')
  dialogCloseEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _supplierListService: SupplierListService) {
    this.i = true;
   }

  ngOnInit(): void {

  }

    dataSource: any = [
      {
        'companyCode'   : 321,
        'vendor' : 104,
        'logicalSystem' : '',
        'region' : '',
        'accountGroup' : '',
        'email' : ''
      },
      {
        'companyCode'   : 102,
        'vendor' : 351,
        'logicalSystem' : '',
        'region' : '',
        'accountGroup' : '',
        'email' : ''
      },
      {
        'companyCode'   : 103,
        'vendor' : 23,
        'logicalSystem' : '',
        'region' : '',
        'accountGroup' : '',
        'email' : ''
      },
    ];
    values: string[] = ['E6M.', 'E8M', 'SW3'];


        createdControl(): void {
          if (Browser.isDevice) {
              this.qryBldrObj.summaryView = true;
            }
        }

    // Hide the Dialog when click the footer button.
  hideDialog: EmitType<object> = () => {
    this.ejDialog.hide();
  };

  applyFilter: EmitType<object> = () => {
    this.onApply();
    this.ejDialog.hide();
  };

  onApply() {
    this.importRules = this.qryBldrObj.getRules();
    //edit rules
    this._supplierListService.importRule$.next(this.importRules);
    //add chips
    this._supplierListService.computeChips(this.importRules);


  }

    // Enables the footer buttons
  buttons: Object = [
    {
      click: this.hideDialog.bind(this),
      // Accessing button component properties by buttonModel property
      buttonModel: {
        content: 'Cancel',
        isPrimary: false,
        cssClass: 'e-btn e-lib e-small query-builder-btn mr-2',
      },
    },
    {
      click: this.applyFilter.bind(this),
      // Accessing button component properties by buttonModel property
      buttonModel: {
        content: 'Apply',
        isPrimary: true,
        cssClass: 'e-btn e-lib e-small query-builder-btn',
      },
    },
  ];
  // Sample level code to handle the button click action
  onOpenDialog = function (): void {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  };

  resetFilter() {
    this.qryBldrObj.reset();
    this.qryBldrObj.refresh();
  }

  dialogClosed() {
    this.dialogCloseEvent.emit(true);
  }

}
