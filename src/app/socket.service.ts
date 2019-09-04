import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
 
@Injectable()

export class SocketService {

    constructor(private socket: Socket) {}
 
    getMessage() {
        return this.socket
            .fromEvent("vas-journal")
            .map( data => data);
    }
       
}