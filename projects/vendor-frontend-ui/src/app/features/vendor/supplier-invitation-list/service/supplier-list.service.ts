/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RuleModel } from '@syncfusion/ej2-querybuilder';
import { BehaviorSubject } from 'rxjs-compat/BehaviorSubject';
import { Observable } from 'rxjs-compat/Observable';
import { GridData } from '../model/grid-data.model';
import { Vendor } from '../model/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierListService {

  public chips$ = new BehaviorSubject<string[]>([]);
  public importRule$ = new BehaviorSubject<RuleModel>({});
  public vendorList$ = new BehaviorSubject<Vendor[]>([]);
  public gridData$ = new BehaviorSubject<Vendor[]>([]);

  constructor(private httpClient: HttpClient) {
    this.computeChips(this.setInitialRule());
  }

  public setInitialRule() : RuleModel{
      let rule = {
        'condition': 'and',
        'rules': [{"label":"Company Code","field":"companyCode","operator":"in","type":"number","value":[321]}]
        };
      this.importRule$.next(rule);
      return this.importRule$.getValue();
  }

  public computeChips(importRule: RuleModel){
    const chips: string[] = [];
      importRule.rules.forEach(rule =>{
          chips.push(rule.field);
      });
      this.chips$.next(chips);
  }

  public deleteChips(field:string){
    let chipsArry = this.chips$.getValue();
    let finalChipArray = chipsArry;
    let index;
    chipsArry.forEach(chip =>{
      if(chip === field){
           index = finalChipArray.indexOf(chip);
      }
    });
    if (index > -1) {
      finalChipArray.splice(index, 1);
   }

   this.chips$.next(finalChipArray);
  }

  public findChip(field : string): boolean{
       let val = this.chips$.getValue().find(chip=>chip === field);
       if(val === field)
          {return true;}
    return false;
  }
  public updateImportRules(){
    let status: boolean;
    let index;
    let importRule = this.importRule$.getValue();
      this.importRule$.getValue().rules.forEach(rule=>{
          status = this.findChip(rule.field);
          if(status === false){
            index = importRule.rules.indexOf(rule);
          }

      });

      if (index > -1) {
        importRule.rules.splice(index, 1);
     }
  }

  public getChipSize() : number{
    return this.chips$.getValue().length;
  }

  public getVendorData(): Observable<GridData[]>{
    return this.httpClient.get<GridData[]>('https://dev-alevate-cap-api.azurewebsites.net/api/vendor-portal/invitation/get-contacts/v2')

  }

}
