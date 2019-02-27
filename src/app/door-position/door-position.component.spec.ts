import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorPositionComponent } from './door-position.component';

describe('DoorPositionComponent', () => {
  let component: DoorPositionComponent;
  let fixture: ComponentFixture<DoorPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoorPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
