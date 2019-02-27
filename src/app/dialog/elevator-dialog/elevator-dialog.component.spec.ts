import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorDialogComponent } from './elevator-dialog.component';

describe('ElevatorDialogComponent', () => {
  let component: ElevatorDialogComponent;
  let fixture: ComponentFixture<ElevatorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElevatorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
