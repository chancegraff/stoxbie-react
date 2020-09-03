declare namespace NodeJS {
  export interface document {
    createRange: any;
  }

  export interface Global {
    ResizeObserver: any;
    location: any;
    document: document;
  }
}
