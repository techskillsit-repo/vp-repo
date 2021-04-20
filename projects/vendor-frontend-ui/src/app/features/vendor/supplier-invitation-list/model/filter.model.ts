
export interface Filter{
  condition : string;
  rules : FRule[]
}

export interface FRule{
  field: string;
  operator: string;
  value: string | number | boolean | string[] | number[];
}

