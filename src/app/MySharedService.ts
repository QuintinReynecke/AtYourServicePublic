import { Injectable } from '@angular/core';

@Injectable()
export class MySharedService {
    public data: any;

    setOption(value : any) {
        this.data= value;
    }
       getOption() {
        return this.data;
    }
}
