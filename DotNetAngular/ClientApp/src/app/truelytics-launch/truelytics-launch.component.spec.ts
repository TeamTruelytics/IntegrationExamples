import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruelyticsLaunchComponent } from './truelytics-launch.component';

describe('TruelyticsLaunchComponent', () => {
  let component: TruelyticsLaunchComponent;
  let fixture: ComponentFixture<TruelyticsLaunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruelyticsLaunchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruelyticsLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
