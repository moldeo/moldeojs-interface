import { Injectable } from '@angular/core';
import * as xmljs from "xml-js";

@Injectable()
export class MoConfigService {

  constructor() { }

  loadXML(configtext: string){
    let result: any = xmljs.xml2js( configtext, {alwaysArray: true,compact: true,ignoreComment: true, alwaysChildren: false});

    return result;
  }

}
