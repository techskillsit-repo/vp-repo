import { Injectable } from '@angular/core';
import { RuleModel } from '@syncfusion/ej2-querybuilder';
import { Filter, FRule } from '../model/filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterTransformerService {


  filter : Filter;
  fRule: FRule;
  fRuleArry: FRule[] = [];

  constructor() {
    this.filter = {
      'condition' : '',
      'rules' : []
    };
    this.fRule = {
      'field' : '',
      'operator' : '',
      'value' : ''
    }
   }

  public transform(rule: RuleModel) : Filter{
    console.log('Rule model to transform ' + JSON.stringify(rule));
      this.filter.condition = rule.condition;
      this.fRuleArry = [];
      rule.rules.forEach(r=>{
        this.fRule = {
          'field' : '',
          'operator' : '',
          'value' : ''
        }
        this.fRule.field = r.field;
        this.fRule.operator = '$' + r.operator;
        this.fRule.value = r.value;
        this.fRuleArry.push(this.fRule);
      });
      this.filter.rules = this.fRuleArry;
      return this.filter;
  }
}
