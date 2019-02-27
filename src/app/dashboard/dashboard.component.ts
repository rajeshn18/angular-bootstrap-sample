import { Component, OnInit, forwardRef} from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataService} from '../services/data.service';
import { FetchService } from '../services/fetch.service';
import { WebsocketService } from '../services/websocket.service';
import { Subscription , Observable  } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ElevatorDialogComponent} from '../dialog/elevator-dialog/elevator-dialog.component';



// export class Message {
//   constructor(
//       public sender: string,
//       public content: string,
//       public isBroadcast = false,
//   ) { }
// }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:  [forwardRef(() => FetchService) , WebsocketService]
})

export class DashboardComponent implements OnInit {
  timeVal : string;
  doorPos1Val : string;
  doorPos2Val : string;
  drivePhaseVal : string;
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

  // parameters for bar chart
  doorPos1 : any = [];
  doorPos2 : any = [];
  drivePhase : any = [];
  openingCnt : number = 0;
  closingCnt : number = 0;
  openedCnt : number = 0;
  closedCnt : number = 0;
  lockedCnt : number = 0;

  openingCnt2 : number = 0;
  closingCnt2 : number = 0;
  openedCnt2 : number = 0;
  closedCnt2 : number = 0;
  lockedCnt2 : number = 0;

  drivePhaseCnt : number = 0;

  barHighcharts : any;
  barChartConstructor : any;
  barChartOptions : any;
  barUpdateFlag : boolean = false;
  barOneToOneFlag : boolean = true;
  barRunOutsideAngularFlag : boolean = false;
  barChartCallback : any;

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

  constructor(private fetchService:FetchService, public dialog: MatDialog) {
    //this.doorPos1Val = 'data';
    fetchService.messages.subscribe(msg => {			
      //console.log(msg);
      this.doorPos1Val = msg.doorStatePos1;
      this.doorPos2Val = msg.doorStatePos2;
      this.drivePhaseVal = msg.drivePhase;
      this.timeVal = msg.time;
      this.elevatorSine.push(msg.elevatorSine);
      this.cabinPos.push(msg.cabinPos);
      this.timeData.push(msg.time);

      var time = new Date(msg.time).getDate()+'/'+new Date(msg.time).getMonth()+'/'+new Date(msg.time).getFullYear();

      if(this.columnTimedata.length >= 5) {
        this.columnTimedata.shift();
        this.columnTimedata.push(msg.time);
      }else {
        this.columnTimedata.push(msg.time);
      }
      
      this.getDoorPostion1Value(msg.doorStatePos1);
      this.getDoorPostion2Value(msg.doorStatePos2);
      this.getDrivePhaseValue(msg.drivePhase);
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

      this.drivePhase = [];
      this.drivePhase.push(this.columnAcceleration);
      this.drivePhase.push(this.columnBraking);
      this.drivePhase.push(this.columnStanding);
      this.drivePhase.push(this.columnFullSpeed);

      this.updateFlag = true;
      this.barUpdateFlag = true;
      this.columnUpdateFlag = true;
      
      console.log("Func inside subscribe");
      this.getLineChart();
      this.getBarChart();
      this.getColumnChart();

    },
    function() {
      
    }
    );
     this.getLineChart();
     this.getBarChart();
   }

  ngOnInit() {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ElevatorDialogComponent, {
      height: '250px',
      width: '600px',      
      //data: {source : 'dashboard', time: this.timeVal, doorPos1: this.doorPos1Val, doorPos2: this.doorPos2Val, drivePhase:this.drivePhaseVal}
      data: {source : 'dashboard', time: '2pm', doorPos1: 'Opening', doorPos2: 'Closing', drivePhase:'Acceleration'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.doorPos1Val = result;
    });
  }


   timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
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

  getDrivePhaseValue(data){
    if(data === 'Acceleration'){ return this.columnAcceleration++;}
    else if(data === 'FullSpeed'){ return this.columnFullSpeed++; }
    else if(data === 'Standing'){ return this.columnStanding++; }
    else { return this.columnBraking++; }
  }

  getLineChart ()
  {

    this.Highcharts = Highcharts; // required
  
    this.chartConstructor = 'chart'; // optional string, defaults to 'chart'
    this.chartOptions = {
    
      title: {
      text: 'Elevator Charts Data'
    },
  
    xAxis: {
        labels: {
          format: this.timeData
      }
    },
    yAxis: {
        title: {
            text: 'Elevator Sine'
        }
    },
      series: [
        {
          name : 'Elevator Sine Data',
          data: this.elevatorSine
        },
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