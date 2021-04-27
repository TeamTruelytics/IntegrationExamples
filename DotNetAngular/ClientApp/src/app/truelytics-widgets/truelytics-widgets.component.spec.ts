import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruelyticsWidgetsComponent } from './truelytics-widgets.component';

describe('TruelyticsWidgetsComponent', () => {
  let component: TruelyticsWidgetsComponent;
  let fixture: ComponentFixture<TruelyticsWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruelyticsWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruelyticsWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
