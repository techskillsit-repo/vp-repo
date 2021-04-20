import { DeleteEventArgs } from '@syncfusion/ej2-angular-buttons';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SupplierListService } from '../../service/supplier-list.service';

@Component({
  selector: 'vendor-supplier-list-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input()
  chips: string[];

  @Output()
  showFiterValue=new EventEmitter<boolean>();

  value:boolean=false;
  constructor(private _supplierListService: SupplierListService) { }

  ngOnInit(): void {
    console.log('In ToolBar line 21.. ' + this.chips);
  }

  showFilter() : void{
    this.value=!this.value;
    this.showFiterValue.emit(this.value);
  }

  onDelete(event: DeleteEventArgs): void {
    console.log('in toobar line 30.. chip delete.. ', event.text);
    //delite chip
     this._supplierListService.deleteChips(event.text);
        //update rules
      this._supplierListService.updateImportRules();
    //this.bankStatuService.deleteChip(event.text);
  }
}
