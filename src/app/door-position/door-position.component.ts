import { Component, OnInit, forwardRef} from '@angular/core';
import * as Highcharts from 'highcharts';
import { FetchService } from '../services/fetch.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-door-position',
  templateUrl: './door-position.component.html',
  styleUrls: ['./door-position.component.css'],
  providers:  [forwardRef(() => FetchService) , WebsocketService]
})
export class DoorPositionComponent implements OnInit {

  timeData : any = [];
  // parameters for bar chart
  doorPos1 : any = [];
  doorPos2 : any = [];
  // Door Position 1 Counters
  openingCnt : number = 0;
  closingCnt : number = 0;
  openedCnt : number = 0;
  closedCnt : number = 0;
  lockedCnt : number = 0;
  // Door Position 2 Counters
  openingCnt2 : number = 0;
  closingCnt2 : number = 0;
  openedCnt2 : number = 0;
  closedCnt2 : number = 0;
  lockedCnt2 : number = 0;

  barHighcharts : any;
  barChartConstructor : any;
  barChartOptions : any;
  barUpdateFlag : boolean = false;
  barOneToOneFlag : boolean = true;
  barRunOutsideAngularFlag : boolean = false;
  barChartCallback : any;

  constructor(private fetchService:FetchService) {

    fetchService.messages.subscribe(msg => {
      
      this.getDoorPostion1Value(msg.doorStatePos1);
      this.getDoorPostion2Value(msg.doorStatePos2);
      
      console.log("cnt-"+this.lockedCnt);
      this.doorPos1 = [];
      this.doorPos1.push(this.openingCnt);
      this.doorPos1.push(this.closingCnt);
      this.doorPos1.push(this.openedCnt);
      this.doorPos1.push(this.closedCnt);
      this.doorPos1.push(this.lockedCnt);
      
      this.doorPos2 = [];
      this.doorPos2.push(this.openingCnt2);
      this.doorPos2.push(this.closingCnt2);
      this.doorPos2.push(this.openedCnt2);
      this.doorPos2.push(this.closedCnt2);
      this.doorPos2.push(this.lockedCnt2);
      
      this.barUpdateFlag = true;
      console.log("Func inside subscribe");
      this.getBarChart();
    },
    function() {
      
    }
    );
     
     this.getBarChart();
   }

  ngOnInit() {
  }

  getBarChart()
  {
    this.barHighcharts = Highcharts; // required
  
    this.barChartConstructor = 'chart'; // optional string, defaults to 'chart'
    this.barChartOptions = {
      chart: {
        type: 'bar'
    },
      
      title: {
        text: 'Elevator Door Position Data'
    },
    
  xAxis: {
    categories: ["Opening","Closing", "Opened", "Closed", "Locked"],
    //   labels: {
    //     format: this.timeData
    // }
  },
    yAxis: {
        title: {
            text: 'Elevator Door Data'
        }
    },
      series: [
        {
          name : 'Door state position 1',
          data: this.doorPos1
        },
        {
          name : 'Door state position 2',
          data: this.doorPos2
        }
    ] }; // required
    this.barChartCallback = function (chart) { } // optional function, defaults to null
    this.barUpdateFlag = true; // optional boolean
    this.barOneToOneFlag = true; // optional boolean, defaults to false
    this.barRunOutsideAngularFlag = true; // optional boolean, defaults to false
  }

  getDoorPostion1Value(data){

    if(data === 'Opening'){ return this.openingCnt++;}
    else if(data === 'Closing'){ return this.closingCnt++; }
    else if(data === 'Opened'){ return this.openedCnt++; }
    else if(data === 'Closed'){ return this.closedCnt++; }
    else { return this.lockedCnt++; }

  }

  getDoorPostion2Value(data){

    if(data === 'Opening'){ return this.openingCnt2++;}
    else if(data === 'Closing'){ return this.closingCnt2++; }
    else if(data === 'Opened'){ return this.openedCnt2++; }
    else if(data === 'Closed'){ return this.closedCnt2++; }
    else { return this.lockedCnt2++; }
  }

}
