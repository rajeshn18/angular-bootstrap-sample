import { Component, OnInit, forwardRef} from '@angular/core';
import * as Highcharts from 'highcharts';
import { FetchService } from '../services/fetch.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-drive-phase',
  templateUrl: './drive-phase.component.html',
  styleUrls: ['./drive-phase.component.css'],
  providers:  [forwardRef(() => FetchService) , WebsocketService]
})
export class DrivePhaseComponent implements OnInit {

  drivePhase : any = [];
  columnHighcharts : any;
  columnChartConstructor : any;
  columnChartOptions : any;
  columnUpdateFlag : boolean = false;
  columnOneToOneFlag : boolean = true;
  columnRunOutsideAngularFlag : boolean = false;
  columnChartCallback : any;
  columnTimedata : any = [];

  columnAcceleration : number =0;
  columnFullSpeed : number =0;
  columnStanding : number =0;
  columnBraking : number =0;

  constructor(private fetchService:FetchService) {

    fetchService.messages.subscribe(msg => {			
      
      var time = new Date(msg.time).getDate()+'/'+new Date(msg.time).getMonth()+'/'+new Date(msg.time).getFullYear();

      if(this.columnTimedata.length >= 5) {
        this.columnTimedata.shift();
        this.columnTimedata.push(msg.time);
      }else {
        this.columnTimedata.push(msg.time);
      }

      this.getDrivePhaseValue(msg.drivePhase);

      this.drivePhase = [];
      this.drivePhase.push(this.columnAcceleration);
      this.drivePhase.push(this.columnBraking);
      this.drivePhase.push(this.columnStanding);
      this.drivePhase.push(this.columnFullSpeed);

      this.columnUpdateFlag = true;

      console.log("Func inside subscribe");
      this.getColumnChart();

    },
    function() {
      
    }
    );
     
   }

  ngOnInit() {
  }

  getDrivePhaseValue(data){
    if(data === 'Acceleration'){ return this.columnAcceleration++;}
    else if(data === 'FullSpeed'){ return this.columnFullSpeed++; }
    else if(data === 'Standing'){ return this.columnStanding++; }
    else { return this.columnBraking++; }
  }

  getColumnChart()
  {
    this.columnHighcharts = Highcharts; // required
  
    this.columnChartConstructor = 'chart'; // optional string, defaults to 'chart'
    this.columnChartOptions = {
      chart: {
        type: 'column'
    },
      
      title: {
        text: 'Elevator Drive Phase Data'
    },
    
  xAxis: {
    categories: ['Acceleration', 'FullSpeed','Standing','Braking'] //this.columnTimedata,
  },
    yAxis: {
      min: 0,
      title: {
          text: 'Drive Phase Count'
      }
    },
      series: [
        {
          name : 'Drive Phase',
          data: this.drivePhase
        }
        
    ] }; // required
    this.columnChartCallback = function (chart) { } // optional function, defaults to null
    this.columnUpdateFlag = true; // optional boolean
    this.columnOneToOneFlag = true; // optional boolean, defaults to false
    this.columnRunOutsideAngularFlag = true; // optional boolean, defaults to false
  }

}
