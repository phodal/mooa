import { Injectable } from '@angular/core';

@Injectable()
export class DocumentRef {

  get body(): any {
    return document.body;
  }

  get documentElement(): any {
    return document.documentElement;
  }

  createElement(tag) {
    return document.createElement(tag);
  }
}
