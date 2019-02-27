import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinPositionComponent } from './cabin-position.component';

describe('CabinPositionComponent', () => {
  let component: CabinPositionComponent;
  let fixture: ComponentFixture<CabinPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
