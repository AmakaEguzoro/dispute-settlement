import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
 
@Injectable()

export class SocketService {
 
    constructor(private socket: Socket) {}
 
    // sendMessage(){
        
    //     this.socket.emit("vas-journal", { query: { "token": "59fj9439ewdi93" }});
    //     console.log("Sending emit message to socket server");
    // }

    getMessage() {
        return this.socket
            .fromEvent("vas-journal")
            .subscribe( data => {
               console.log("Response from server - " + JSON.stringify(data))
            } );
    }
    
    // onConnection(){
    //   return this.socket.connect()
    // }

   
}