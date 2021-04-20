
export interface GridData{
  EMAIL: string;
  USER_NAME: string;
  CONTACT_TYPE: string;
  SOURCE: string;
  VENDORS: Vendor[];
  COMPANY: Company[];
}

export interface Vendor{
  AWSYS: string;
  LIFNR: string;
  NAME1: string;
  ORT01: string;
  REGIO: string;
  STRAS: string;
  KTOKK: string;
}

export interface Company{
  BUKRS: string;
}

