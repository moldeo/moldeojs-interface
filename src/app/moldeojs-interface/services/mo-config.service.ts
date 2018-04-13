import { Injectable } from '@angular/core';
import * as xmljs from "xml-js";

@Injectable()
export class MoConfigService {

  constructor() { }

  loadXML(configtext: string): any{
    let result: any = xmljs.xml2js( configtext, {alwaysArray: true, compact: true, ignoreComment: true, alwaysChildren: false});

    return result;
  }

  createMOJS(moconfig: any): any{
    let mojs: any;
    let moobjects: any = moconfig.nativeElement.children;

    return mojs;
  }
}
