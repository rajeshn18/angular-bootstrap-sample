import { Component, OnInit, forwardRef} from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataService} from '../services/data.service';
import { FetchService } from '../services/fetch.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-cabin-position',
  templateUrl: './cabin-position.component.html',
  styleUrls: ['./cabin-position.component.css'],
  providers:  [forwardRef(() => FetchService) , WebsocketService]
})
export class CabinPositionComponent implements OnInit {

  // parameters for Line chart
  elevatorSine : any =[];
  cabinPos : any = [];
  timeData : any = [];
  Highcharts : any;
  chartConstructor : any;
  chartOptions : any;
  updateFlag : boolean = false;
  oneToOneFlag : boolean = true;
  runOutsideAngular : boolean = false;
  chartCallback : any;

  constructor(private fetchService:FetchService) {

    fetchService.messages.subscribe(msg => {			
      //console.log(msg);
      //this.elevatorSine.push(msg.elevatorSine);
      this.cabinPos.push(msg.cabinPos);
      this.timeData.push(msg.time);
      this.updateFlag = true;

      console.log("Func inside subscribe");
      this.getLineChart();

    },
    function() {
      
    }
    );
     this.getLineChart();
   }

  ngOnInit() {

  }

  getLineChart ()
  {

    this.Highcharts = Highcharts; // required
  
    this.chartConstructor = 'chart'; // optional string, defaults to 'chart'
    this.chartOptions = {
    
      title: {
      text: 'Elevator Cabin Data'
    },
  
    xAxis: {
        labels: {
          format: this.timeData
      }
    },
    yAxis: {
        title: {
            text: 'Elevator Cabin Position'
        }
    },
      series: [
        {
          name : 'Elevator Cabin Pos Data',
          data: this.cabinPos
        }
    ] 
  }; // required
  this.chartCallback = function (chart) { } // optional function, defaults to null
  this.updateFlag = false; // optional boolean
  this.oneToOneFlag = true; // optional boolean, defaults to false
  this.runOutsideAngular = false; // optional boolean, defaults to false
  }

}
