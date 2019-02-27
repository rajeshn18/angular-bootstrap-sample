import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';

export interface DialogData {
  //source : string;
  time : string;
  doorPos1: string;
  doorPos2: string;
  drivePhase : string;
}

@Component({
  selector: 'app-elevator-dialog',
  templateUrl: './elevator-dialog.component.html',
  styleUrls: ['./elevator-dialog.component.css']
})
export class ElevatorDialogComponent implements OnInit {
  dialogData : any = [];
  displayedColumns: string[] = ['time','doorPos1', 'doorPos2', 'drivePhase'];
  dataSource : any;
  constructor(
    public dialogRef: MatDialogRef<ElevatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {  dialogRef.disableClose = true; 
      }

  onNoClick(): void {
    this.dialogRef.close();
  }

  

  ngOnInit() {
    console.log("Dialog data source: "+this.data.doorPos1);

  this.dialogData.push({
    time : this.data.time,
    doorPos1: this.data.doorPos1,
    doorPos2: this.data.doorPos2,
    drivePhase : this.data.drivePhase
  });
  this.dataSource = new MatTableDataSource<DialogData>(this.dialogData);
  }

}
