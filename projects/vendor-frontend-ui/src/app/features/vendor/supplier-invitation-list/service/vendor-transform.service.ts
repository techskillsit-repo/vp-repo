import { Injectable } from '@angular/core';
import { GridData } from '../model/grid-data.model';
import { Vendor } from '../model/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorTransformService {

  vendorData : Vendor[] =[];
  constructor() {}

  transform(data: GridData[]) : Vendor[]{
     data.forEach(e=>{
      let vendor : Vendor;
      vendor = {
        EMAIL_ADDRESS : '',
        SOURCE : '',
        USER_NAME : '',
        CONTACT_TYPE : '',
        VENDOR_NUMBER : '',
        VENDOR_NAME : '',
        COUNTRY : '',
        ACCOUNT_GROUP : '',
        REGION : ''
      };
      vendor.EMAIL_ADDRESS = e.EMAIL;
      vendor.SOURCE = e.SOURCE;
      vendor.USER_NAME = e.USER_NAME;
      vendor.CONTACT_TYPE = e.CONTACT_TYPE;

      e.VENDORS.some(v=>{
        vendor.VENDOR_NUMBER = v.LIFNR;
        vendor.VENDOR_NAME =v.NAME1;
        vendor.COUNTRY = '';
        vendor.ACCOUNT_GROUP = v.KTOKK;
        vendor.REGION = v.REGIO;
        return false;
      });
      this.vendorData.push(vendor);
    });
    return this.vendorData;
  }
}
