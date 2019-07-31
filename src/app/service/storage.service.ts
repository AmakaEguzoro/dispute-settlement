import { Injectable } from "@angular/core";
import { root } from "rxjs/internal/util/root";
import { EncrDecrService } from "./encr-decr.service";
import { Constants } from "common/constants";
import { T } from "@angular/core/src/render3";

@Injectable({
    providedIn: "root"
})
export class StorageService{

    constructor( private crytpSerive: EncrDecrService){
    }

    public get<T>(storage_name: string) : T {
        let value = <any>localStorage.getItem(storage_name);

        if(!value) return null;
        return JSON.parse(this.crytpSerive.get(Constants.KEYS.TOKEN, value)) as T;
    }

    public set(storage_name: string, value: any){
        return localStorage.setItem(storage_name, this.crytpSerive.set(Constants.KEYS.TOKEN, JSON.stringify(value)));
    }

    public clear(storage_name: string){
        localStorage.removeItem(storage_name);
    }

    public clear_all(){
        localStorage.clear();
    }
}  