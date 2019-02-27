import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { HighchartsChartModule } from 'highcharts-angular';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DoorPositionComponent } from './door-position/door-position.component';
import { DrivePhaseComponent } from './drive-phase/drive-phase.component';
import { CabinPositionComponent } from './cabin-position/cabin-position.component';
import { ElevatorDialogComponent } from './dialog/elevator-dialog/elevator-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule } from '@angular/material';
import { AngformComponent } from './angform/angform.component';
import {FormsModule} from "@angular/forms";

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard',
  pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cabin', component: CabinPositionComponent },
  { path: 'door', component: DoorPositionComponent },
  { path: 'drive', component: DrivePhaseComponent },
  { path: 'form' , component: AngformComponent }
 
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DoorPositionComponent,
    DrivePhaseComponent,
    CabinPositionComponent,
    ElevatorDialogComponent,
    AngformComponent
    //
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    AngularFontAwesomeModule,
    MatDialogModule,
    MatTableModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ElevatorDialogComponent
],
  
})
export class AppModule { }
