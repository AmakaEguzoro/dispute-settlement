import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
 
@Injectable()

export class SocketService {

    constructor(private socket: Socket) {}
       
    // getMessage() {
    //     return this.socket
    //         .fromEvent("vas-journal")
    //         .subscribe( data => {
    //             console.log('response from socket -' + JSON.stringify(data))
    //         });
    // }

    getMessage() {
        return this.socket
            .fromEvent("vas-journal")
            .map( data => data);
    }

    disconnectSocket(){
        return this.socket.disconnect();
    }
}