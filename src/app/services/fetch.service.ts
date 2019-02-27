import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators';

// For Azure use below
const CHAT_URL = 'wss://' + 'elevatorlegacy.azurewebsites.net';

//For local deploy use below
//const CHAT_URL = 'wss://' + 'localhost:3000';

export interface Message {
	elevatorSine: string,
	cabinPos: number,
	doorStatePos1 : string,
	doorStatePos2: string,
	drivePhase : string,
	time : any
}

@Injectable()
export class FetchService {
	public messages: Subject<Message>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
            .connect(CHAT_URL)
      .pipe
      ( map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return {
					elevatorSine: data.elevatorSine,
					cabinPos: data.cabinPos,
					doorStatePos1: data.doorStatePos1,
					doorStatePos2: data.doorStatePos2,
					drivePhase : data.drivePhase,
					time : data.time
				}
            })
        );
	}
}