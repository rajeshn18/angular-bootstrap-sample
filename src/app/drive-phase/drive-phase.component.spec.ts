import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivePhaseComponent } from './drive-phase.component';

describe('DrivePhaseComponent', () => {
  let component: DrivePhaseComponent;
  let fixture: ComponentFixture<DrivePhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivePhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivePhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
