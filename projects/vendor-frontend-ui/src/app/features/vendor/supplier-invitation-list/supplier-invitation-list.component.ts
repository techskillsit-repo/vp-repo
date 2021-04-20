import { RuleModel } from '@syncfusion/ej2-angular-querybuilder';
import { SelectingEventArgs, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupplierListService } from './service/supplier-list.service';
import { Observable } from 'rxjs-compat/Observable';
import { BehaviorSubject } from 'rxjs-compat/BehaviorSubject';
import { FilterTransformerService } from './service/filter-transformer.service';
import { Filter } from './model/filter.model';
import { Subscription } from 'rxjs-compat/Subscription';
import { GridData } from './model/grid-data.model';
import { VendorTransformService } from './service/vendor-transform.service';


 @Component({
  selector: 'app-supplier-invitation-list',
  templateUrl: './supplier-invitation-list.component.html',
  styleUrls: ['./supplier-invitation-list.component.scss']
})
export class SupplierInvitationListComponent implements OnInit,OnDestroy  {

  @ViewChild('element' , {static: true}) tabObj: TabComponent;
  private subscriptions: Subscription[] = [];
  target = '.control-section';
  showFilter = false;
  public headerText: Object = [{ 'text': '<div class="e-title  ">Vendors</div>' },
  { 'text': '<div class="e-title  ">Invitation Monitoring</div>' },
  { 'text': '<div class="e-title e-active">Invite</div>' }];


  public importRules$ = new BehaviorSubject<RuleModel>({});
  public chips$ = new BehaviorSubject<string[]>([]);

  filter: Filter;
  count : number;

  constructor( private translateService: TranslateService,
    private _supplierListService: SupplierListService,
    private _filterTransformerService: FilterTransformerService,
    private _vendorTransformService : VendorTransformService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this._supplierListService.getVendorData().subscribe(
      (_data) => {
        this._supplierListService.gridData$.next(this._vendorTransformService.transform(_data));
      },
      (err) =>{ }
    ));

    this.tabObj.selectedItem = 2;
    this.subscriptions.push(this._supplierListService.importRule$.subscribe(_rule=>{
      this.importRules$.next(_rule);
      this.filter = this._filterTransformerService.transform(_rule);
     }));

    this.subscriptions.push(this._supplierListService.chips$.subscribe(_chips=>{
      this.chips$.next(_chips);
      this.count = _chips.length;
    }));
}

  public animation: object = {
    previous: { effect: "", duration: 0, easing: "" },
    next: { effect: "", duration: 0, easing: "" }
      };

/**
   * Display global filter
   */
 displayFilter = (): void => {
   console.log('here.. line 70');
  this.target = '.toolbar';
  this.showFilter = !this.showFilter;
};

/**
   *
   * @param $event RuleModel
   * apply the filter according to rule model
   */
 onApply($event: RuleModel): void {

  //this.bankStatusService.applyFilter($event);
}

/**
 * closes the global filter
 */
hideFilter(event: string): void {
  this.showFilter = false;
}

ngOnDestroy(){
  this.subscriptions.forEach(subscription => subscription.unsubscribe());
}


}
